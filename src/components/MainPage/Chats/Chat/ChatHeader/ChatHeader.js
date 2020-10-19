import React from 'react';
import './ChatHeader.scss';

import leftArrow from '../../../../../assets/images/leftArrow.png';

function ChatHeader(props) {
  const {history, companion} = props;

  const onClick = () => {
    history.goBack();
  }

  return(
    <div className='chat-header'>
      <div className='chat-header__back' onClick={onClick}>
        <img src={leftArrow}/>
      </div>
      <div className='chat-header__friend'>
        <div className='friend-info'>
          <div className='friend-info__name'>
            <span>{companion.userName}</span>
          </div>
          <div className='friend-info__status'>
            <span>Online</span>
          </div>
        </div>
        {/* вставить img с аватаром */}
        <div className='friend-avatar'></div>
      </div>
    </div>
  );
}

export default ChatHeader;