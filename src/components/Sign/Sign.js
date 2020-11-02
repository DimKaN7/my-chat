import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { connect } from 'react-redux';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import useAuth from '../../tools/hooks/useAuth';
import Loader from '../Loader/Loader';
import useFirestore from '../../tools/hooks/useFirestore';
import {setUser, setLoading} from '../../actions/actions';

const Sign = (props) => {
  const {
    user, setUser,
    loading, setLoading,
    isSignUp=false,
  } = props;

  const history = useHistory();
  const { signUp, signIn } = useAuth();
  const { addDocument } = useFirestore();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const titles = {
    header: isSignUp ? 'Register' : 'Login',
    description: isSignUp ? 'Please, enter email, password and it`s confirmation to sign up.' : 'Please, enter your email and password to sign in.',
    button: isSignUp ? 'Sign up' : 'Sign in',
    tip: isSignUp ? 'Already have an account?' : 'Don`t have an account?',
    link: isSignUp ? '/signIn' : '/signUp',

  }
  const linkStyle = {
    textDecoration: 'none',
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (confPassword !== password) {
        setError('Passwords don`t match');
      }
      else {
        setLoading(true);
        signUp(email, password)
          // signed up successfully
          .then((u) => {
            const user = {
              chats: [],
              userName: u.user.email,
              verified: false,
            };
            addDocument(user, u.user.uid, 'users')
              .then(() => {
                setUser({
                  id: u.user.uid,
                });
                localStorage.setItem('id', u.user.uid);
                history.push('/p/chats');
              })
              .catch((e) => {
                setError('Something went wrong');
              });
            setLoading(false);
          })
          // some error in email or passwords
          .catch((e) => {
            setError(e.message);
            setLoading(false);
          });
      }
    }
    else {
      setLoading(true);
      signIn(email, password)
        .then((u) => {
          // console.log(u);
          setUser({id: u.user.uid});
          localStorage.setItem('id', u.user.uid);
          setLoading(false);
          history.push('/p/chats');
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    }
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
        setConfPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className='sign-wrapper'>
      {loading && <Loader />}
      <div className='page__header'>
        <span>{titles.header}</span>
      </div>
      <div className={error ? 'page__error' : 'page__description'}>
        <span>{error ? error
                     : titles.description}</span>
      </div>
      <form className='sign-form' onSubmit={onSubmit}>
        <div className='sign-form__inputs'>
          <CustomInput placeholder='Email' inputFor='email'
            onChange={onChange}/>
          <CustomInput placeholder='Password' inputFor='password' 
            type='password' onChange={onChange}/>
          {isSignUp && <CustomInput placeholder='Confirm password' inputFor='confPassword' 
            type='password' onChange={onChange}/>}
        </div>
        <CustomButton title={titles.button} onClick={onSubmit} type='submit'/>
      </form>
      {!isSignUp && 
        <div style={{marginBottom: '20px'}}>
          <Link to='/forgotPassword' style={linkStyle}>
          Forgot password?</Link>
        </div>
      }
      <div>
        <span>
          {titles.tip} <Link to={titles.link} style={linkStyle}>{isSignUp ? 'Login' : 'Sign up'}</Link>
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = ({user, loading}) => {
  return {
    user,
    loading,
  }
}

const mapDispatchToProps = {
  setUser,
  setLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sign);