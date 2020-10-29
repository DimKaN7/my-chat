import React from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import './Settings.scss';

import useAuth from '../../../tools/hooks/useAuth';
import {setUser} from '../../../actions/actions';

const Settings = (props) => {
  const {
    user, setUser,
  } = props;

  const {logout} = useAuth();
  const history = useHistory();

  const onClick = () => {
    logout()
      .then(() => {
        localStorage.removeItem('id');
        setUser({id: ''});
        history.push('/');
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <div onClick={onClick}>Settings</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);