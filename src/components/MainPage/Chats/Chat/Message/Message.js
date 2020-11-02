import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Message.scss';

import {getTime} from '../../../../../tools/tools';

function Message(props) {
  const {message, time, mine=false} = props;

  return (
    <div className='message-wrapper' 
      style={{justifyContent: mine ? 'flex-end' : 'flex-start'}}>
      <div className={mine ? 'message my' : 'message'}>
        <span>{message}</span>
        <div className='message__time'>
          <span>{getTime(time, true)}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;