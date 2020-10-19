import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Message.scss';

import {getTime} from '../../../../../tools/tools';

function Message(props) {
  const {message, time, mine=false} = props;

  return (
    <div className='message'>
      <div className='message__content-wrapper'
            style={{justifyContent: mine ? 'flex-end' : 'flex-start'}}>
        <div className={mine ? 'message__content my' : 'message__content'}>
          <span>{message}</span>
          <div className='message__time'>
            <span>{getTime(time, true)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;