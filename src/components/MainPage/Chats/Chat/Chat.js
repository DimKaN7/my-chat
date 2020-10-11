import React, {useState, useRef, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './Chat.scss';

import paperClip from '../../../../assets/images/paperclip.png';
import send from '../../../../assets/images/send.png';

import ChatHeader from './ChatHeader/ChatHeader';
import Message from './Message/Message';
import useDeviceDetect from '../../../../../tools/hooks/useDeviceDetect';

function Chat(props) {
  const [messages, setMessages] = useState([{
    message: 'This is message from your friend', time: '12:00'
  }, {
    message: 'This is message from you', time: '12:10', my: true
  }]);
  const [message, setMessage] = useState('');
  const isMobile = useDeviceDetect();
  
  const chat = useRef(null);
  const input = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onChange = (e) => {
    // cделать автозайз
    setMessage(e.target.value);
  }

  // при появлении клавиатуры должен скролиться
  // const onFocus = () => {}

  const scrollToBottom = () => {
    chat.current.scrollTo({top: chat.current.scrollHeight, behavior: 'smooth'});
  }

  const onKeyDown = (e) => {
    if ((e.keyCode === 13 && e.shiftKey === false) && !isMobile) {
      onSubmit(e);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const hours = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
    const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;
    const m = {
      message: message,
      time: `${hours}:${minutes}`,
      my: true,
    }
    setMessages([...messages, m]);
    setMessage('');
    input.current.focus();
  }

  return(
    <div className='chat'>
      <ChatHeader />
      <div className='chat__content' ref={chat}>
        <TransitionGroup
          component={null}>
          {messages.map((m, id) => 
            <CSSTransition
              key={id}
              timeout={400}
              classNames="mess">
              <Message message={m.message} time={m.time} my={m.my}/>
            </CSSTransition>
          )}
        </TransitionGroup>
        <div></div>
      </div>
      <form className='chat__message' onSubmit={onSubmit} ref={form}>
        <div className='message-field'>
          <div className='message-field__attachment image-cont'>
            <img src={paperClip}/>
          </div>
          <textarea placeholder='Type a message' 
                  ref={input}
                  type='submit'
                  onChange={onChange}
                  value={message} 
                  onKeyDown={onKeyDown}
                  />
          <div className='message-field__send-button image-cont' onClick={onSubmit}>
            <img src={send}/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;