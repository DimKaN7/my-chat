import React from 'react';
import {useHistory} from 'react-router-dom';
import './ChatSnippet.scss';

import {getTime, getLastMessage} from '../../../../tools/tools';

const ChatSnippet = (props) => {
  const {chat} = props;
  // console.log(chat);

  const history = useHistory();

  const onClick = () => {
    history.push(`/p/chats/${chat.id}`);
  }

  return (
    <div className='snippet' onClick={onClick}>
      <div className='snippet__avatar'>
        
      </div>
      <div className='snippet__lastMessage'>
        <span className='snippet__user'>{chat.companion.userName}</span>
        <span className='snippet__message'>{getLastMessage(chat.messages).message}</span>
      </div>
      <div className='snippet__time'>
        <span>{getTime(getLastMessage(chat.messages).time.seconds)}</span>
        {/* time.seconds with firebase !!!!!  */}
      </div>
    </div>
  );
}

export default ChatSnippet;