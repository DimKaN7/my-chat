import React from 'react';
import {connect} from 'react-redux';
import './Chats.scss';

import ChatSnippet from './ChatSnippet/ChatSnippet';
import {setChats, setLoading} from '../../../actions/actions';
import Loader from '../../Loader/Loader';

const Chats = (props) => {
  const {
    chats, setChats,
    // user, setUser,
    loading, setLoading,
  } = props;
  // const chats = [
  //   {
  //     user: 'Someone',
  //     lastMessage: 'Its last message',
  //     time: '12:00',
  //   },
  //   {
  //     user: 'Someone new',
  //     lastMessage: 'Its last message too adasdasdasda',
  //     time: '15:00',
  //   }
  // ];

  return (
    <div className='chats'>
      {
        loading 
          ? <Loader />
          : chats && chats.map(c => {
              return <ChatSnippet key={c.id} chat={c} />
            })}
    </div>
  );
}

const mapStateToProps = ({chats, loading}) => {
  return {
    chats,
    loading,
  }
}

const mapDispatchToProps = {
  setChats,
  setLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);