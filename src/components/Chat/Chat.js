import React, {useState, useRef, useEffect} from 'react';
import './Chat.scss';

import paperClip from '../../assets/images/paperclip.png';
import send from '../../assets/images/send.png';

import ChatHeader from './ChatHeader/ChatHeader';
import GradientDivider from '../GradientDivider/GradientDivider';
import Message from './Message/Message';

function Chat(props) {
  const [messages, setMessages] = useState([{
    message: 'This is message from your friend', time: '12:00'
  }, {
    message: 'This is message from you', time: '12:10', my: true
  }]);
  const [message, setMessage] = useState('');
  
  const chat = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onChange = (e) => {
    // зделать автозайз
    setMessage(e.target.value);
  }

  const onFocus = () => {
    // при появлении клавиатуры должен скролиться
  }

  const scrollToBottom = () => {
    chat.current.scrollTo({top: chat.current.scrollHeight, behavior: 'smooth'});
  }

  // const onKeyDown = (e) => {
  //   if (e.keyCode === 13 && e.shiftKey === false) {
  //     e.preventDefault();
  //   }
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    // const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
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
        {messages.map((m, id) => 
          <Message key={id} message={m.message} time={m.time} my={m.my}/>
        )}
        <div></div>
      </div>
      <form className='chat__message' onSubmit={onSubmit}>
        <div className='message-field'>
          <div className='message-field__attachment image-cont'>
            <img src={paperClip}/>
          </div>
          <textarea placeholder='Type a message' 
                  ref={input}
                  type='text'
                  onChange={onChange}
                  value={message} 
                  onFocus={onFocus}
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