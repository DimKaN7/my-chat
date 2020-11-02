import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { connect } from 'react-redux';

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import useAuth from '../../tools/hooks/useAuth';
import Loader from '../Loader/Loader';
import {addDocument, getDocument} from '../../tools/tools';
import {setUser, setLoading} from '../../actions/actions';
import {titles, signButtonsStyles} from '../../tools/consts';

const Sign = (props) => {
  const {
    user, setUser,
    loading, setLoading,
    isSignUp=false,
  } = props;

  const history = useHistory();
  const { signUp, signIn } = useAuth();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('qwe@qwe.com');
  const [password, setPassword] = useState('123456');
  const [confPassword, setConfPassword] = useState('');

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

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
              email: u.user.email,
              verified: false,
            };
            addDocument(user, u.user.uid, 'users')
              .then(() => {
                const {userName, verified, email} = user;
                setUser({
                  id: u.user.uid,
                  userName,
                  verified,
                  email,
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
              const {userName, verified} = doc.data();
              user = {
                id: doc.id,
                verified,
                userName,
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
        <span>{titles(isSignUp).header}</span>
      </div>
      <div className={error ? 'page__error' : 'page__description'}>
        <span>{error ? error
                     : titles(isSignUp).description}</span>
      </div>
      <form className='sign-form' onSubmit={onSubmit}>
        <div className='sign-form__inputs'>
          <CustomInput placeholder='Email' inputFor='email'
            onChange={onChange} value={email}/>
          <CustomInput placeholder='Password' inputFor='password' 
            type='password' onChange={onChange} value={password}/>
          {isSignUp && <CustomInput placeholder='Confirm password' inputFor='confPassword' 
            type='password' onChange={onChange}/>}
        </div>
        <CustomButton title={titles(isSignUp).button} onClick={onSubmit} 
          type='submit' styles={signButtonsStyles.signBlue}/>
      </form>
      {!isSignUp && 
        <div style={{marginBottom: '20px'}}>
          <Link to='/forgotPassword' style={signButtonsStyles.link}>
          Forgot password?</Link>
        </div>
      }
      <div>
        <span>
          {titles(isSignUp).tip} <Link to={titles(isSignUp).link} style={signButtonsStyles.link}>{isSignUp ? 'Login' : 'Sign up'}</Link>
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