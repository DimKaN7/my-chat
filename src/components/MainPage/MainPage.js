import React, {useState, useEffect} from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import './MainPage.scss';

import Footer from './Footer/Footer';
import Chats from './Chats/Chats';
import Friends from './Friends/Friends';
import Settings from './Settings/Settings';

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
          <Route path='/p/chats/' component={Chats}/>
          <Route path='/p/friends' component={Friends}/>
          <Route path='/p/settings' component={Settings}/>
        </Switch>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;