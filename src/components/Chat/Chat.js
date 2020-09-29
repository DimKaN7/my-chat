import React, {useState, useRef, useEffect} from 'react';
import autosize from 'autosize';
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
  const scrollEnd = useRef(null);

  useEffect(() => {
    // на мобилке не скорлит из а клавиатуры
    scrollEnd.current.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const onChange = (e) => {
    // зделать автозайз
    setMessage(e.target.value);
  }

  const onClick = () => {
    const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
    const m = {
      message: message,
      time: time,
      my: true,
    }
    setMessages([...messages, m]);
    setMessage('');
  }

  return(
    <div className='chat'>
      <ChatHeader />
      <GradientDivider />
      <div className='chat__content'>
        {messages.map((m, id) => 
          <Message key={id} message={m.message} time={m.time} my={m.my}/>
        )}
        <div ref={scrollEnd}></div>
      </div>
      <div className='chat__message'>
        <div className='message-field'>
          <div className='message-field__attachment image-cont'>
            <img src={paperClip}/>
          </div>
          <textarea placeholder='Type a message' 
                    onChange={onChange}
                    value={message} />
          <div className='message-field__send-button image-cont' onClick={onClick}>
            <img src={send}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;