import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import './SettingPopup.scss';

import CustomButton from '../../../CustomButton/CustomButton';
import CustomInput from '../../../CustomInput/CustomInput';
import Marquee from '../../../Marquee/Marquee';
import useAuth from '../../../../tools/hooks/useAuth';
import {setUser} from '../../../../actions/actions';
import {updateDocument} from '../../../../tools/tools';
import {buttonsStyle} from '../../../../tools/consts';
import {setLoading} from '../../../../actions/actions';

const SettingPopup = (props) => {
  const {
    user, setUser,
    onCancelClick
  } = props;

  const userNameCatRef = useRef(null);
  const emailCatRef = useRef(null);
  const passwordCatRef = useRef(null);
  const categoriesRef = useRef(null);

  const newUserNameRef = useRef(null);
  const newEmailRef = useRef(null);
  const newEmailPassRef = useRef(null);
  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const passConfRef = useRef(null);

  const [backlightStyle, setBacklightStyle] = useState({});
  const [fieldsScrollerStyle, setFieldsScrollerStyle] = useState({});
  const [contentStyle, setContentStyle] = useState({});
  const [catWrapperStyle, setCatWrapperStyle] = useState({});

  const [catIndex, setCatIndex] = useState(0);
  const [error, setError] = useState('');

  const {changeEmail, changePassword} = useAuth();

  // useEffect(() => {
  //   const catWrapperStyle = {
  //     width: categoriesRef.current.clientWidth >= 300 
  //       ? '100%'
  //       : '300px',
  //   };
  //   setCatWrapperStyle(catWrapperStyle);
  //   console.log(categoriesRef.current.clientWidth);
  // }, [categoriesRef]);

  const onCategoriesClick = (cat) => {
    // проверка на нажатие уже выбранной категории
    if (!((catIndex === 0 && cat === 0) || (catIndex === 1 && cat === 1) || (catIndex === 2 && cat === 2))) {
      const backlightStyle = {
        width: `${userNameCatRef.current.clientWidth}px`,
        transform: cat === 0
          ? `translateX(0px)`
          : cat === 1 
            ? `translateX(${userNameCatRef.current.clientWidth}px)`
            : `translateX(${userNameCatRef.current.clientWidth * 2}px)`,
      };
      const fieldsScrollerStyle = {
        transform: cat === 0 
          ? `translateX(0)`
          : cat === 1 
            ? `translateX(-33.33%)`
            : `translateX(-66.66%)`,
      }
      const contentStyle = {
        height: cat === 2
          ? '305px'
          : '250px',
      }
      const catWrapperStyle = categoriesRef.current.clientWidth < 300 
        ? {
          transform: cat === 0 
            ? 'translateX(0)'
            : cat === 1 
              ? `translateX(-${150 - categoriesRef.current.clientWidth/2}px)`
              : `translateX(-${300 - categoriesRef.current.clientWidth}px)`
        }
        : {};

      setCatIndex(cat);
      setContentStyle(contentStyle);
      setBacklightStyle(backlightStyle);
      setFieldsScrollerStyle(fieldsScrollerStyle);
      setCatWrapperStyle(catWrapperStyle);
    }
  }

  const onSaveClick = () => {
    // uset name change
    if (catIndex === 0) {
      const userName = newUserNameRef.current.value;
      if (user.userName === userName) {
        onCancelClick();
      }
      else {
        if (userName.trim().length === 0) setError('User name can not be empty');
        else {
          setLoading(true);
          setUser({
            ...user,
            userName,
          });
          updateDocument({userName}, user.id, 'users');
          setLoading(false);
          onCancelClick();
        }
      }
    }
    // email change
    else if (catIndex === 1) {
      const email = newEmailRef.current.value;
      const password = newEmailPassRef.current.value;
      if (!email || !password) setError('Fields are not filled');
      else {
        if (user.password !== password) setError('Incorrect password');
        else {
          setLoading(true);
          changeEmail(email)
            .then(() => {
              setUser({
                ...user,
                email,
              });
              updateDocument({email}, user.id, 'users');
              setLoading(false);
              onCancelClick();
            })
            .catch((e) => {
              setLoading(false);
              setError(e.message);
            });
        }
      }
    }
    // password change
    else {
      const oldPass = oldPassRef.current.value;
      const newPass = newPassRef.current.value;
      const passConf = passConfRef.current.value;
      if (!oldPass || !newPass || !passConf) setError('Fields are not filled');
      else {
        if (user.password !== oldPass) setError('Incorrect old password');
        else {
          if (newPass !== passConf) setError('Password does not match confirmation');
          else {
            setLoading(true);
            changePassword(newPass)
              .then(() => {
                setUser({
                  ...user,
                  password: newPass,
                });
                updateDocument({password: newPass}, user.id, 'users');
                setLoading(false);
                onCancelClick();
              })
              .catch((e) => {
                setLoading(false);
                setError(e.message);
              });
          }
        }
      }
    }
  }

  return (
    <div className='setting-popup'>
      <div className='setting-popup__wrapper'></div>
      <div className='setting-popup__content' style={contentStyle}>
        <Marquee text={error || 'Profile editing'}
          style={{marginBottom: '10px', color: `${error ? 'red' : 'black'}`, textAlign: `${error ? 'center' : 'start'}`}}
        />
        {/* <span style={{color: error ? 'red' : 'black'}}>{error || 'Profile editing'}</span> */}
        <div className='categories' ref={categoriesRef}>
          <div className='categories-wrapper' style={catWrapperStyle}>
            <div className='backlight' style={backlightStyle}></div>
            <div className={catIndex === 0 ? 'categories__user-name selected' : 'categories__user-name'} 
              ref={userNameCatRef} onClick={() => onCategoriesClick(0)}>
              User name
            </div>
            <div className={catIndex === 1 ? 'categories__email selected' : 'categories__email'} 
              ref={emailCatRef} onClick={() => onCategoriesClick(1)}>
              Email
            </div>
            <div className={catIndex === 2 ? 'categories__password selected' : 'categories__password'} 
              ref={passwordCatRef} onClick={() => onCategoriesClick(2)}>
              Password
            </div>
          </div>
        </div>
        <div className='input-fields'>
          <div className="input-fields-wrapper" style={fieldsScrollerStyle}>
            <div>
              <CustomInput placeholder='New user name' reference={newUserNameRef} />
            </div>
            <div>
              <CustomInput placeholder='New email' reference={newEmailRef} />
              <CustomInput placeholder='Password' type='password' reference={newEmailPassRef}/>
            </div>
            <div>
              <CustomInput placeholder='Old password' type='password' reference={oldPassRef}/>
              <CustomInput placeholder='New password' type='password' reference={newPassRef}/>
              <CustomInput placeholder='Confirm password' type='password' reference={passConfRef}/>
            </div>
          </div>
        </div>
        <div className='buttons'>
          <CustomButton title='Save' onClick={onSaveClick}
            styles={{width: '40%', ...buttonsStyle.blue}}
          />
          <CustomButton title='Cancel' onClick={onCancelClick}
            styles={{width: '40%', ...buttonsStyle.white}}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({user}) => {
  return {
    user,
  }
}

const mapDispatchToProps = {
  setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPopup);