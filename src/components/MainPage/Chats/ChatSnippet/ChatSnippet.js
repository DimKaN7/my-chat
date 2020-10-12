import React, {useState, useEffect} from 'react';
import './ChatSnippet.scss';

const ChatSnippet = (props) => {
  const {companion, lastMessage} = props;
  const {message, time} = lastMessage;

  const getTime = (time) => {
    // const nowS = Math.floor(new Date().getTime() / 1000);
    // const timeS = new Date(time).getTime();
    const now = new Date();
    const h = now.getHours();
    const d = now.getDate();
    const mnth = now.getMonth();
    const y = now.getFullYear();

    const timeDate = new Date(time * 1000);
    console.log(timeDate);
    if (y - timeDate.getFullYear() >= 1) {
      return `${timeDate.getDate()}.${timeDate.getMonth()}.${timeDate.getFullYear()}`;
    } else if (mnth - timeDate.getMonth() >= 1 || 
                h - timeDate.getHours() + 24 * (d - timeDate.getDate()) > 24) {
      return `${timeDate.getDate()}.${timeDate.getMonth()}`;
    } else {
      return `${timeDate.getHours()}:${timeDate.getMinutes()}`;
    }
  } 

  useEffect(() => {
    // getTime(time.seconds);
    // console.log('lol')
  }, []);

  return (
    <div className='snippet'>
      <div className='snippet__avatar'>
        
      </div>
      <div className='snippet__lastMessage'>
        <span className='snippet__user'>{companion}</span>
        <span className='snippet__message'>{message}</span>
      </div>
      <div className='snippet__time'>
        <span>{getTime(time.seconds)}</span>
      </div>
    </div>
  );
}

export default ChatSnippet;