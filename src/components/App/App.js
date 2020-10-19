import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.scss';

import Login from '../Login/Login';

import {setPage, setChats, setUser} from '../../actions/actions';
import {db} from '../../firebase';
import MainPage from '../MainPage/MainPage';
import Chat from '../MainPage/Chats/Chat/Chat';

function App(props) {
  const {
    page, setPage,
    chats, setChats,
    user, setUser,
  } = props;

  // vieport в браузерах скидывает поле ввода за область
  // экрана, для этого ставим высоту равную innerHeight
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const update = () => {
      setInnerHeight(window.innerHeight);
    }
    window.addEventListener('resize', update);

    const sortChats = (c) => {
      console.log(c.chats);
      const result =  {
        ...c,
        chats: c.chats.sort((a, b) => b.messages[b.messages.length - 1].time.seconds - a.messages[a.messages.length - 1].time.seconds),
      };
      return result;
    }
    const unsubscribeChats = db.collection('chats')
      .where('users', 'array-contains', user.id)
      .onSnapshot(snap => {
        console.log('onSnap');
        snap.docs.map(doc => {
          db.collection('users')
            // собеседник
            .where('__name__', '==', doc.data().users.find(u => u !== user.id))
            .get()
            .then(snap => {
              const id = doc.id;
              const companion = {
                userName: snap.docs[0].data().userName,
                id: snap.docs[0].id,
              };
              const messages = doc.data().messages;
              const chat = {
                id,
                companion,
                messages,
              };
              setChats([chat]);
            });
        });
      });

    return () => {
      window.removeEventListener('resize', update);
      unsubscribeChats();
    };
  }, []);
  
  return (
    <Router>
      <div className="app" style={{height: `${innerHeight}px`}}>
        <Route path='/' exact component={Login}/>
        <Route path='/p/:page' exact component={MainPage}/>
        <Route path='/p/chats/:id' exact render={({match}) => {
          const chat = chats.find(c => c.id === match.params.id);
          return <Chat chat={chat} />
        }}/>
      </div>
    </Router>
  );
}

const mapStateToProps = ({page, chats, user}) => {
  return {
    page,
    chats,
    user,
  }
}

const mapDispatchToProps = {
  setPage,
  setChats,
  setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);