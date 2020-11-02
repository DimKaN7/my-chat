import React from 'react';
import {connect} from 'react-redux';
import './Header.scss';

import {pages} from '../../../tools/consts';

const Header = (props) => {
  const {
    page,
  } = props;

  return (
    <div className='header'>
      <div className='header__avatar'></div>
      <div className='header__title'>
        {pages[page]}
      </div>
    </div>
  );
}

const mapStateToProps = ({page}) => {
  return {
    page,
  }
}

export default connect(mapStateToProps)(Header);