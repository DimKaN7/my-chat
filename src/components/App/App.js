import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.scss';

import Login from '../Login/Login';

import {setPage} from '../../actions/actions';
import MainPage from '../MainPage/MainPage';

function App(props) {
  const {page, setPage} = props;

  // vieport в браузерах скидывает поле ввода за область
  // экрана, для этого ставим высоту равную innerHeight
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const update = () => {
      setInnerHeight(window.innerHeight);
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  
  return (
    <Router>
      <div className="app" style={{height: `${innerHeight}px`}}>
        <Route path='/' exact component={Login}/>
        <Route path='/p/:page' exact component={MainPage}/>
      </div>
    </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);