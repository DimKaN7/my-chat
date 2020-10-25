import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

// import chatIcon from '../../assets/images/chatIcon.png';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';

function SignUp(props) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

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
      case 'confPassword': 
        break;
    }
  }

  const linkStyle = {
    textDecoration: 'none',
  }

  return (
    <div className='sign-wrapper'>
      <div className='page__header'>
        <span>Register</span>
      </div>
      <div className='page__description'>
        <span>Please, enter email, password and it`s confirmation to sign up.</span>
      </div>
      <form className='sign-form' onSubmit={onSubmit}>
        <div className='sign__inputs'>
          <CustomInput placeholder='Email' inputFor='email'
            onChange={onChange}/>
          <CustomInput placeholder='Password' inputFor='password' 
            type='password' onChange={onChange}/>
          <CustomInput placeholder='Confirm password' inputFor='confPassword' 
            type='password' onChange={onChange}/>
        </div>
        <CustomButton title='Sign up' onClick={onSubmit} type='submit'/>
      </form>
      <div>
        <span>
          Already have an account? <Link to='/signIn' style={linkStyle}>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default SignUp;