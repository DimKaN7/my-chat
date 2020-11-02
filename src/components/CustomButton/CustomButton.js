import React from 'react';
import './CustomButton.scss';

const CustomButton = (props) => {
  const {
    title, onClick, type='',
    styles,
  } = props;

  return (
    <button type={type} className='custom-button' 
      onClick={onClick} style={styles}>
      {title}
    </button>
  );
}

export default CustomButton;