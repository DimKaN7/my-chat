import React from 'react';
import './Message.scss';

function Message(props) {
  const {message, time, my=false} = props;

  return (
    <div className='message'>
      <div className='message__time'>
        <span>{time}</span>
      </div>
      <div className='message__content-wrapper'
            style={{justifyContent: my ? 'flex-end' : 'flex-start'}}>
        <div className={my ? 'message__content my' : 'message__content'}>{message}</div>
      </div>
    </div>
  );
}

export default Message;