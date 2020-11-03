import React from 'react';
import './Verify.scss';

import email from '../../../assets/images/email.png';

const Verify = () => {
  return (
    <div className='verify'>
      Verify your email address to start chatting
      <div style={{backgroundImage: `url(${email})`}}></div>
    </div>
  );
}

export default Verify;