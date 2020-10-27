import React, {useState, useEffect} from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import './MainPage.scss';

import Footer from './Footer/Footer';
import Chats from './Chats/Chats';
import Friends from './Friends/Friends';
import Settings from './Settings/Settings';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

function MainPage(props) {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const update = () => {
      setInnerHeight(window.innerHeight);
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className='main-page' style={{height: `${innerHeight}px`}}>
      <div className='main-page__content'>
        <Switch>
          <PrivateRoute path='/p/chats/' component={Chats}/>
          <PrivateRoute path='/p/friends' component={Friends}/>
          <PrivateRoute path='/p/settings' component={Settings}/>
        </Switch>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;