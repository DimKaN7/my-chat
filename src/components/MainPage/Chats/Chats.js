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
      
    // }
  }, []);

  // useEffect(() => {
  //   console.log(chats);
  //   console.log(user);
  // }, [chats, user]);

  return (
    <div className='chats'>
      {chats && chats.map(c => {
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