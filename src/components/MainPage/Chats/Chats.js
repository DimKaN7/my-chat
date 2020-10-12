import React, {useState, useEffect} from 'react';
import './Chats.scss';

import ChatSnippet from './ChatSnippet/ChatSnippet';
import {db} from '../../../firebase';

const Chats = (props) => {
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

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('users')
      .where('__name__', '==', '3u79UQZxyvpxMBeKQvCz')
      .onSnapshot(snap => {
          snap.docs.map(doc => {
            const chat = {
              id: doc.id,
              ...doc.data()
            };
            setChats(...chats, chat.chats);
            // console.log(chat.chats);
        });
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className='chats'>
      {chats.map((c, i) => {
        return <ChatSnippet key={i} 
                  lastMessage={c.messages[c.messages.length - 1]}
                  companion={c.companion}
                />
      })}
    </div>
  );
}

export default Chats;