import React from 'react';
import './Chats.scss';
import ChatSnippet from './ChatSnippet/ChatSnippet';

const Chats = (props) => {
  const chats = [
    {
      user: 'Someone',
      lastMessage: 'Its last message',
      time: '12:00',
    },
    {
      user: 'Someone new',
      lastMessage: 'Its last message too adasdasdasda',
      time: '15:00',
    }
  ];

  return (
    <div className='chats'>
      {chats.map((c, i) => {
        return <ChatSnippet key={i} chat={c}/>
      })}
    </div>
  );
}

export default Chats;