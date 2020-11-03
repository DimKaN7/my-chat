import React, {useState, useRef} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { connect } from 'react-redux';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import useAuth from '../../tools/hooks/useAuth';
import Loader from '../Loader/Loader';
import {addDocument, getDocument} from '../../tools/tools';
import {setUser, setLoading} from '../../actions/actions';
import {titles, buttonsStyle} from '../../tools/consts';

const Sign = (props) => {
  const {
    user, setUser,
    loading, setLoading,
    isSignUp=false,
  } = props;

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const passConfRef = useRef(null);

  const history = useHistory();
  const { signUp, signIn } = useAuth();
  const [error, setError] = useState('');
  // const [email, setEmail] = useState('qwe@qwe.com');
  // const [password, setPassword] = useState('123456');
  // const [confPassword, setConfPassword] = useState('');

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    if (isSignUp) {
      const passwordConfirm = passConfRef.current.value;
      if (passwordConfirm !== password) {
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
              email: u.user.email,
              verified: false,
              password,
            };
            addDocument(user, u.user.uid, 'users')
              .then(() => {
                const {userName, verified, email, password} = user;
                setUser({
                  id: u.user.uid,
                  userName,
                  verified,
                  email,
                  password,
                });
                // localStorage.setItem('user', JSON.stringify(user));
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
          let user = {};
          getDocument(u.user.uid, 'users')
            .then((doc) => {
              const {userName, verified, password, email} = doc.data();
              user = {
                id: doc.id,
                verified,
                userName,
                password,
                email,
              };
              setUser(user);
              // localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('id', user.id);
              setLoading(false);
              history.push('/p/chats');
            })
            .catch((e) => {
              setError(e.message);
              setLoading(false);
            });
        })
        .catch((e) => {
          setError(e.message);
          setLoading(false);
        });
    }
  }
  // const onChange = (e, input) => {
  //   switch (input) {
  //     case 'email':
  //       setEmail(e.target.value)
  //       break;
  //     case 'password':
  //       setPassword(e.target.value)
  //       break;
  //     case 'confPassword': 
  //       setConfPassword(e.target.value);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return (
    <div className='sign-wrapper'>
      {loading && <Loader />}
      <div className='page__header'>
        <span>{titles(isSignUp).header}</span>
      </div>
      <div className={error ? 'page__error' : 'page__description'}>
        <span>{error ? error
                     : titles(isSignUp).description}</span>
      </div>
      <form className='sign-form' onSubmit={onSubmit}>
        <div className='sign-form__inputs'>
          <CustomInput placeholder='Email' reference={emailRef} />
          <CustomInput placeholder='Password' reference={passRef}
            type='password' />
          {isSignUp && <CustomInput placeholder='Confirm password' reference={passConfRef}
            type='password'/>}
        </div>
        <CustomButton title={titles(isSignUp).button} onClick={onSubmit} 
          type='submit' styles={buttonsStyle.blue}/>
      </form>
      {!isSignUp && 
        <div style={{marginBottom: '20px'}}>
          <Link to='/forgotPassword' style={buttonsStyle.link}>
          Forgot password?</Link>
        </div>
      }
      <div>
        <span>
          {titles(isSignUp).tip} <Link to={titles(isSignUp).link} style={buttonsStyle.link}>{isSignUp ? 'Login' : 'Sign up'}</Link>
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