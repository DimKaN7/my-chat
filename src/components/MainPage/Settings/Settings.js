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
import {settingsButtonsStyle} from '../../../tools/consts';
import SettingPopup from './SettingPopup/SettingPopup';

const Settings = (props) => {
  const {
    user, setUser,
    loading,
  } = props;

  const [showPopup, toggleShowPopup] = useState(true);

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

  return (
    <>
      {
        loading 
          ? <Loader /> 
          : showPopup
            ? <SettingPopup />
            : <div className='settings'>
                <div className="user-info">
                  <div className="user-info__avatar"></div>
                  <div className="user-info__user-name">
                    {user.userName}
                    {/* <div className="edit"
                      style={{backgroundImage: `url(${edit})`}}>
                    </div> */}
                  </div>
                  <div className="user-info__email">
                    {user.email}
                    {/* <div className="edit"
                      style={{backgroundImage: `url(${edit})`}}>
                    </div> */}
                  </div>
                </div>
                <div className="settings-actions">
                  <div>
                    <CustomButton title='Edit profile' onClick={onEditClick}
                      styles={settingsButtonsStyle.editProfile}/>
                  </div>
                  <div>
                    <CustomButton title='Logout' onClick={onLogoutClick}
                      styles={settingsButtonsStyle.logout}/>
                  </div>
                  <div>
                    <CustomButton title='Delete profile' onClick={onDeleteClick}
                      styles={settingsButtonsStyle.deleteProfile}/>
                  </div>
                </div>
              </div>
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