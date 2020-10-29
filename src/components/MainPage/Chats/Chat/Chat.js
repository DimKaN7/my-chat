import React, {useState, useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import './Chat.scss';

import paperClip from '../../../../assets/images/paperclip.png';
import send from '../../../../assets/images/send.png';

import ChatHeader from './ChatHeader/ChatHeader';
import Message from './Message/Message';
import useDeviceDetect from '../../../../tools/hooks/useDeviceDetect';
import {db} from '../../../../firebase';
import Loader from '../../../Loader/Loader';

const Chat = (props) => {
  const {
    user,
    chats,
    chat,
  } = props;

  const [message, setMessage] = useState('');

  const isMobile = useDeviceDetect();
  const history = useHistory();
  
  const chatContent = useRef(null);
  const input = useRef(null);
  const form = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const onChange = (e) => {
    // cделать автозайз
    setMessage(e.target.value);
  }

  // при появлении клавиатуры должен скролиться
  // const onFocus = () => {}

  const scrollToBottom = () => {
    try {
      chatContent.current.scrollTo({top: chatContent.current.scrollHeight, behavior: 'smooth'});
    } catch (e) {}
  }

  const onKeyDown = (e) => {
    if ((e.keyCode === 13 && e.shiftKey === false) && !isMobile) {
      onSubmit(e);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const m = {
      message: message,
      time: firebase.firestore.Timestamp.fromDate(new Date()),
      to: chat.companion.id,
    }
    setMessage(''); 
    db.collection('chats').doc(chat.id).update({
      messages: [...chat.messages, m],
    });
    input.current.focus();
  }

  return(
    <div className='chat'>
      {!chat  
        ? <Loader/>
        : <>
            <ChatHeader history={history} companion={chat.companion}/>
            <div className='chat__content' ref={chatContent}>
              <TransitionGroup
                component={null}>
                {chat.messages.map((m, index) => 
                  <CSSTransition
                    key={index}
                    timeout={400}
                    classNames="mess">
                    <Message message={m.message} time={m.time.seconds} mine={m.to !== user.id}/>
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
                <textarea className='message-field__input' placeholder='Type a message' 
                  ref={input}
                  type='text'
                  onChange={onChange}
                  value={message} 
                  onKeyDown={onKeyDown}
                  /> 
                <div className='message-field__send-button image-cont' onClick={onSubmit}>
                  <img src={send}/>
                </div>
              </div>
            </form>
          </>
      }
      
    </div>
  );
}

const mapStateToProps = ({chats, user}) => {
  return {
    chats,
    user,
  }
}

export default connect(mapStateToProps)(Chat);