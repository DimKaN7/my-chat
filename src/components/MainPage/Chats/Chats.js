import React from 'react';
import {connect} from 'react-redux';
import './Chats.scss';

import ChatSnippet from './ChatSnippet/ChatSnippet';
import {setChats, setLoading} from '../../../actions/actions';
import Loader from '../../Loader/Loader';
import Verify from '../Verify/Verify';

const Chats = (props) => {
  const {
    chats,
    user, 
    loading,
  } = props;

  return (
    <div className='chats'>
      {
        !user.verified 
          ? <Verify />
          : loading || !chats
              ? <Loader />
              : chats && chats.map(c => {
                  return <ChatSnippet key={c.id} chat={c} />
                })
      }
    </div>
  );
}

const mapStateToProps = ({chats, loading, user}) => {
  return {
    chats,
    loading,
    user,
  }
}

export default connect(mapStateToProps)(Chats);