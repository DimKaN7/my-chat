import React from 'react';
import './Friends.scss';
import { connect } from 'react-redux';
import Verify from '../Verify/Verify';

const Friends = (props) => {
  const {user} = props;

  return (
    <div className='friends'>
      {
        !user.verified
          ? <Verify />
          : <div>
              Friends
            </div>
      }
    </div>
  );
}

const mapStateToProps = ({user}) => {
  return {
    user,
  }
}

export default connect(mapStateToProps)(Friends);