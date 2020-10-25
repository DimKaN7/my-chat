import React from 'react';
import './CustomButton.scss';

const CustomButton = (props) => {
  const {
    title, onClick, white=false, type='',
  } = props;

  return (
    <button type={type} className={white ? 'custom-button white' : 'custom-button'} onClick={onClick}>{title}</button>
  );
}

export default CustomButton;