import React, {useState, useEffect} from 'react';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import './MainPage.scss';

import Footer from './Footer/Footer';
import Chats from './Chats/Chats';
import Friends from './Friends/Friends';
import Settings from './Settings/Settings';
import Header from './Header/Header';
import {setPage} from '../../actions/actions';
import {pages} from  '../../tools/consts';

const MainPage = (props) => {
  const {
    page, setPage,
  } = props;
  const match = useRouteMatch();

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    // console.log(match.params.page);
    setPage(pages.map(p => p.toLowerCase()).indexOf(match.params.page));
    const update = () => {
      setInnerHeight(window.innerHeight);
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className='main-page' style={{height: `${innerHeight}px`}}>
      <Header/>
      <div className='main-page__content'>
        <Switch>
          <Route path='/p/chats/' component={Chats}/>
          <Route path='/p/friends' component={Friends}/>
          <Route path='/p/settings' component={Settings}/>
        </Switch>
      </div>
      <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);