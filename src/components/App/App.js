import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.scss';

import {setChats, setUser, setLoading} from '../../actions/actions';
import {db} from '../../firebase';
import MainPage from '../MainPage/MainPage';
import Chat from '../MainPage/Chats/Chat/Chat';
import WelcomePage from '../WelcomePage/WelcomePage';
import Sign from '../Sign/Sign';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {getDocument} from '../../tools/tools';

function App(props) {
  const {
    chats, setChats,
    user, setUser,
    setLoading,
  } = props;
  // vieport в браузерах скидывает поле ввода за область
  // экрана, для этого ставим высоту равную innerHeight
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const update = () => {
      setInnerHeight(window.innerHeight);
    }
    window.addEventListener('resize', update);

    // const u = JSON.parse(localStorage.getItem('user'));
    const id = localStorage.getItem('id');
    if (id) {
      setLoading(true);
      getDocument(id, 'users')
        .then((doc) => {
          const {email, userName, verified, password} = doc.data();
          const user = {
            id, email, userName, verified, password
          };
          setUser(user);
          setLoading(false);
          // console.log(user);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (user.id) {
      setLoading(true);
      // const sortChats = (c) => {
      //   console.log(c.chats);
      //   const result =  {
      //     ...c,
      //     chats: c.chats.sort((a, b) => b.messages[b.messages.length - 1].time.seconds - a.messages[a.messages.length - 1].time.seconds),
      //   };
      //   return result;
      // }
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
                const {messages} = doc.data();
                const chat = {
                  id,
                  companion,
                  messages,
                };
                // пока только 1 чат
                setChats([chat]);
                setLoading(false);
              });
          });
        });
      return () => {
        unsubscribeChats();
      }
    }
  }, [user]);
  
  return (
    <Router>
      <div className="app" style={{height: `${innerHeight}px`}}>
        {/* <PrivateRoute path='/' exact signedInTo='/p/chats' component={WelcomePage}/>
        <PrivateRoute path='/signIn' exact signedInTo='/p/chats' render={() => {
          return <Sign isSignUp={false}/>
        }}/>
        <PrivateRoute path='/signUp' exact signedInTo='/p/chats' render={() => {
          return <Sign isSignUp={true}/>
        }}/>
        <Route path='/p' exact render={() => {
          return <Redirect to='/p/chats'/>
        }}/>
        <PrivateRoute path='/p/:page' exact unsignedInTo='/' component={MainPage}/>
        рендер, так как почему то с компонентом были косяки (анимация и скрытие клавиатуры)
        <Route path='/p/chats/:id' exact render={({match}) => {
          const chat = chats && chats.find(c => c.id === match.params.id);
          return <Chat chat={chat} />
        }}/> */}
        <Route path='/' exact component={WelcomePage}/>
        <Route path='/signIn' exact render={() => {
          return <Sign isSignUp={false}/>
        }}/>
        <Route path='/signUp' exact render={() => {
          return <Sign isSignUp={true}/>
        }}/>
        <Route path='/p' exact render={() => {
          return <Redirect to='/p/chats'/>
        }}/>
        <Route path='/p/:page' exact component={MainPage}/>
        {/* рендер, так как почему то с компонентом были косяки (анимация и скрытие клавиатуры) */}
        <Route path='/p/chats/:id' exact render={({match}) => {
          const chat = chats && chats.find(c => c.id === match.params.id);
          return <Chat chat={chat} />
        }}/>
      </div>
    </Router>
  );
}

const mapStateToProps = ({chats, user}) => {
  return {
    chats,
    user,
  }
}

const mapDispatchToProps = {
  setChats,
  setUser,
  setLoading,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);