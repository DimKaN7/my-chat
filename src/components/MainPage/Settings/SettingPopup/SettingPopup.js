import React, {useState, useEffect, useRef} from 'react';
import './SettingPopup.scss';

const SettingPopup = () => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const categoriesRef = useRef(null);
  const scroll = useRef(null);

  const [backlightStyle, setBacklightStyle] = useState({});
  const [scrollerStyle, setScrollerStyle] = useState({});
  const [emailShow, toggle] = useState(true);

  // useEffect(() => {
  //   const style = {
  //     width: `${emailRef.current.clientWidth}`,
  //     height: `${emailRef.current.clientHeight}`,
  //   };
  //   console.log(style);
  //   setBacklightStyle(style);
  // }, [emailRef]);

  const onClick = (e) => {
    const el = e.target.classList.value;
    // проверка на нажатие уже выбранной категории
    if (!((emailShow && el.indexOf('email') !== -1) || (!emailShow && el.indexOf('password') !== -1))) {
      const backlightStyle = {
        width: el.indexOf('email') === -1
          ? `${passwordRef.current.clientWidth}px`
          : `${emailRef.current.clientWidth}px`,
        transform: el.indexOf('email') === -1
          ? `translateX(${categoriesRef.current.clientWidth - passwordRef.current.clientWidth}px)`
          : `translateX(0px)`,
      };
      const scrollerStyle = {
        transform: emailShow 
          ? `translateX(-50%)`
          : `translateX(0)`,
      }
      toggle(!emailShow);
      setBacklightStyle(backlightStyle);
      setScrollerStyle(scrollerStyle);
    }
  }

  return (
    <div className='setting-popup'>
      <div className='setting-popup__wrapper'></div>
      <div className='setting-popup__content'>
        <span>Profile editing</span>
        <div className='categories' ref={categoriesRef}>
          <div className='backlight' style={backlightStyle}></div>
          <div className={emailShow ? 'categories__email selected' : 'categories__email'} 
            ref={emailRef} onClick={onClick}>
            Email
          </div>
          <div className={!emailShow ? 'categories__password selected' : 'categories__password'} 
            ref={passwordRef} onClick={onClick}>
            Password
          </div>
        </div>
        <div className='input-fields'>
          <div className="input-fields-wrapper" style={scrollerStyle}>
            <div>asdasdasd</div>
            <div>asdasdasd</div>
          </div>
        </div>
        <div className='buttons'></div>
      </div>
    </div>
  );
}

export default SettingPopup;