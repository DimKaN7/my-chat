import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

// import chatIcon from '../../assets/images/chatIcon.png';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';

function SignIn(props) {
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

  const linkStyle = {
    textDecoration: 'none',
  }

  return (
    <div className='sign-wrapper'>
      <div className='page__header'>
        <span>Login</span>
      </div>
      <div className='page__description'>
        <span>Please, enter your email and password to sign in.</span>
      </div>
      <form className='sign-form' onSubmit={onSubmit}>
        <div className='sign__inputs'>
          <CustomInput placeholder='Email' inputFor='email'
            onChange={onChange}/>
          <CustomInput placeholder='Password' inputFor='password' 
            type='password' onChange={onChange}/>
        </div>
        <CustomButton title='Sign in' onClick={onSubmit} type='submit'/>
      </form>
      <div style={{marginBottom: '20px'}}>
        <Link to='/forgotPassword' style={linkStyle}>
        Forgot password?</Link>
      </div>
      <div>
        <span>
          Don`t have an account? <Link to='/signUp' style={linkStyle}>Sign up</Link>
        </span>
      </div>
    </div>
  );
}

export default SignIn;