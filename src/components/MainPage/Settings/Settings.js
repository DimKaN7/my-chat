import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import './Settings.scss';

import useAuth from '../../../tools/hooks/useAuth';
import {getDocument} from '../../../tools/tools';
import {setUser} from '../../../actions/actions';
import Loader from '../../Loader/Loader';
import edit from '../../../assets/images/edit.png';
import CustomButton from '../../CustomButton/CustomButton';
import {buttonsStyle} from '../../../tools/consts';
import SettingPopup from './SettingPopup/SettingPopup';

const Settings = (props) => {
  const {
    user, setUser,
    loading,
  } = props;

  const [showPopup, toggleShowPopup] = useState(false);

  const {logout} = useAuth();
  const history = useHistory();

  const onLogoutClick = () => {
    logout()
      .then(() => {
        // localStorage.removeItem('user');
        localStorage.removeItem('id');
        setUser({});
        history.push('/');
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  const onEditClick = () => {
    toggleShowPopup(true);
  }

  const onDeleteClick = () => {

  }

  const onCancelClick = () => {
    toggleShowPopup(false);
  }

  return (
    <>
      {
        loading 
          ? <Loader /> 
          : 
            <>
              {showPopup && <SettingPopup onCancelClick={onCancelClick}/>}
              <div className='settings'>
                <div className="user-info">
                  <div className="user-info__avatar"></div>
                  <div className="user-info__user-name">
                    {user.userName}
                  </div>
                  <div className="user-info__email">
                    {user.email}
                  </div>
                </div>
                <div className="settings-actions">
                  <div>
                    <CustomButton title='Edit profile' onClick={onEditClick}
                      styles={buttonsStyle.blue}/>
                  </div>
                  <div>
                    <CustomButton title='Logout' onClick={onLogoutClick}
                      styles={buttonsStyle.white}/>
                  </div>
                  <div>
                    <CustomButton title='Delete profile' onClick={onDeleteClick}
                      styles={buttonsStyle.red}/>
                  </div>
                </div>
              </div>
            </>
      }
    </>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);