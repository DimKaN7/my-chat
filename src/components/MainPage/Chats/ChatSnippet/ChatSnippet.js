import React from 'react';
import './ChatSnippet.scss';

const ChatSnippet = (props) => {
  const {chat} = props;
  const {user, lastMessage, time} = chat;

  return (
    <div className='snippet'>
      <div className='snippet__avatar'>
        {/* image */}
      </div>
      <div className='snippet__lastMessage'>
        <span className='snippet__user'>{user}</span>
        <span className='snippet__message'>{lastMessage}</span>
      </div>
      <div className='snippet__time'>
        <span>{time}</span>
      </div>
    </div>
  );
}

export default ChatSnippet;