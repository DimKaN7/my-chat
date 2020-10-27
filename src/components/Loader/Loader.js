import React from 'react';
import './Loader.scss';

import loader from '../../assets/images/loader.png';

const Loader = () => {
  return (
    <div className='loader-cont'>
      <div className='loader-wrapper'></div>
      <div className='loader' style={{
        backgroundImage: `url(${loader})`,
      }}>
      </div>
    </div>
  );
}

export default Loader;