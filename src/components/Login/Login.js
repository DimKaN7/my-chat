import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Login.scss';

// import chatIcon from '../../assets/images/chatIcon.png';
import CustomInput from './CustomInput/CustomInput';

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(`${email} - ${password}`);
    history.push('/p/chats');
  }
  const onChange = (e, input) => {
    switch (input) {
      case 'email':
        setEmail(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
    }
  }

  return (
    <div className='login-wrapper'>
      <form className='login' onSubmit={onSubmit}>
        <CustomInput placeholder='Email' inputFor='email'
          onChange={onChange}/>
        <CustomInput placeholder='Password' inputFor='password' 
          type='password' onChange={onChange}/>
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}

export default Login;