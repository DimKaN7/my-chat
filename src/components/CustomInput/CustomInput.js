import React from 'react';
import './CustomInput.scss';

function CustomInput(props) {
  const {
    placeholder, type='text', inputFor,
    onChange,
    value, // потом убрать 
  } = props;

  return (
    <div className='custom-input'>
      <input className='custom-input__input' name='input' 
              autoComplete='off' required type={type}
              onChange={(e) => onChange(e, inputFor)}
              value={value}/>
      <label htmlFor='input' className='custom-input__label'>
        <span>{placeholder}</span>
      </label>
    </div>
  );
}


export default CustomInput;