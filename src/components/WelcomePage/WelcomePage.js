import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import '../../scss/signPage.scss';

import talking from '../../assets/images/talking.png';
import CustomButton from '../CustomButton/CustomButton';

const WelcomePage = (props) => {
  const history = useHistory();

  const onSignUp = (e) => {
    history.push('/signUp');
  }
  const onSignIn = (e) => {
    history.push('/signIn');
  }

  return (
    <div className='welcome'>
      <div className='page__header'>
        <span>Get Started</span>
      </div>
      <div className='page__description'>
        <span>Start with signing up or sign in.</span>
      </div>
      <div className='page__image'
        style={{backgroundImage: `url(${talking})`}}>
      </div>
      <div className='page__buttons'>
        <CustomButton title='Sign up' onClick={onSignUp}/>
        <CustomButton title='Sign in' onClick={onSignIn} white/>
      </div>
    </div>
  );
}

export default WelcomePage;