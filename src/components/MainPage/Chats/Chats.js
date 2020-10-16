import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import './Chats.scss';

import ChatSnippet from './ChatSnippet/ChatSnippet';
import {db} from '../../../firebase';
import {setChats, setUser} from '../../../actions/actions';

const Chats = (props) => {
  const {
    chats, setChats,
    user, setUser
  } = props;
  // const chats = [
  //   {
  //     user: 'Someone',
  //     lastMessage: 'Its last message',
  //     time: '12:00',
  //   },
  //   {
  //     user: 'Someone new',
  //     lastMessage: 'Its last message too adasdasdasda',
  //     time: '15:00',
  //   }
  // ];

  // const [chats, setChats] = useState([]);

  useEffect(() => {
    // if (!chats) {
      const sortChats = (c) => {
        console.log(c.chats);
        const result =  {
          ...c,
          chats: c.chats.sort((a, b) => b.messages[b.messages.length - 1].time.seconds - a.messages[a.messages.length - 1].time.seconds),
        };
        return result;
      }
      const unsubscribeChats = db.collection('chats')
        .where('users', 'array-contains', user.id)
        .onSnapshot(snap => {
          snap.docs.map(doc => {
            db.collection('users')
              .where('__name__', '==', doc.data().users.find(u => u !== user.id))
              .get()
              .then(snap => {
                const id = doc.id;
                const companion = snap.docs[0].data().userName;
                const messages = doc.data().messages;
                const chat = {
                  id,
                  companion,
                  messages,
                };
                setChats([chat]);
              });
          });
        });

      return () => {
        console.log('unmount');
        unsubscribeChats();
      }
    // }
  }, []);

  useEffect(() => {
    console.log(chats);
    console.log(user);
  }, [chats, user]);

  return (
    <div className='chats'>
      {chats.map(c => {
        return <ChatSnippet key={c.id} 
                  chat={c} />
      })}
    </div>
  );
}

const mapStateToProps = ({chats, user}) => {
  return {
    chats,
    user,
  }
}

const mapDispatchToProps = {
  setChats,
  setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);