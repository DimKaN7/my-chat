import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './ChatSnippet.scss';

const ChatSnippet = (props) => {
  const {chat} = props;
  console.log(chat);

  const history = useHistory();

  const getTime = (time) => {
    // const nowS = Math.floor(new Date().getTime() / 1000);
    // const timeS = new Date(time).getTime();
    const now = new Date();
    const h = now.getHours();
    const d = now.getDate();
    const mnth = now.getMonth();
    const y = now.getFullYear();

    const timeDate = new Date(time * 1000);
    const resultD = timeDate.getDate() < 10 ? `0${timeDate.getDate()}` : `${timeDate.getDate()}`;
    const resultMnth = timeDate.getMonth() + 1 < 10 ? `0${timeDate.getMonth() + 1}` : `${timeDate.getMonth() + 1}`;
    const resultY = `${timeDate.getFullYear() % 100}`;
    const resultH = timeDate.getHours() < 10 ? `0${timeDate.getHours()}` : `${timeDate.getHours()}`;
    const resultM = timeDate.getMinutes() < 10 ? `0${timeDate.getMinutes()}` : `${timeDate.getMinutes()}`;
    if (y - timeDate.getFullYear() >= 1) {
      return `${resultD}.${resultMnth}.${resultY}`;
    } else if (mnth - timeDate.getMonth() >= 1 || 
                h - timeDate.getHours() + 24 * (d - timeDate.getDate()) > 24) {        
      return `${resultD}.${resultMnth}`;
    } else {
      return `${resultH}:${resultM}`;
    }
  } 
  const getLastMessage = (messages) => {
    return messages[messages.length - 1];
  }

  useEffect(() => {

  }, []);

  const onClick = () => {
    history.push(`/p/chats/${chat.id}`);
  }

  return (
    <div className='snippet' onClick={onClick}>
      <div className='snippet__avatar'>
        
      </div>
      <div className='snippet__lastMessage'>
        <span className='snippet__user'>{chat.companion}</span>
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