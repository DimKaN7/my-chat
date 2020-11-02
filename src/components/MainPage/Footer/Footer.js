import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import './Footer.scss';

import chatIcon from '../../../assets/images/Footer/chat.png';
import friendsIcon from '../../../assets/images/Footer/friends.png';
import settingsIcon from '../../../assets/images/Footer/settings.png';

import {setPage} from '../../../actions/actions';

function Footer(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const pages = ['chats', 'friends', 'settings'];

  const {
    page, setPage,
  } = props;

  // useEffect(() => {
  //   setPage(pages.indexOf(match.params.page));
  // }, []);

  const onClick = (index) => {
    if (pages[index] !== match.params.page) {
      history.push(`/p/${pages[index]}/`);
      setPage(index);
    }
  }

  return (
    <div className='footer'>
      <div style={page === 0 ? {opacity: 1} : {opacity: 0.5}} onClick={() => onClick(0)}><img src={chatIcon}/></div>
      <div style={page === 1 ? {opacity: 1} : {opacity: 0.5}} onClick={() => onClick(1)}><img src={friendsIcon}/></div>
      <div style={page === 2 ? {opacity: 1} : {opacity: 0.5}} onClick={() => onClick(2)}><img src={settingsIcon}/></div>
    </div>
  );
}

const mapStateToProps = ({page}) => {
  return {
    page,
  }
}

const mapDispatchToProps = {
  setPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);