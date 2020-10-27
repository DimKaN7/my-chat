import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({user, component: Component, ...restProps}) => {
  return (
    <Route 
      {...restProps}
      render={(props) => {
        return user.id ? <Component {...props} /> : <Redirect to='/'/>
      }}
    />
  );
}

const mapStateToProps = ({user}) => {
  return {
    user,
  }
}

export default connect(mapStateToProps)(PrivateRoute);