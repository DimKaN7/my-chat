import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({user, signedInTo='', unsignedInTo='', component: Component, render, ...restProps}) => {
  return (
    <>
      {
        Component && 
        <Route 
          {...restProps}
          // signedInTo = если вошел, сработает эта ссылка
          // unsignedInTo = если не вошел, сработает эта ссылка
          component={() => signedInTo 
                                      ? !user.id ? <Component /> : <Redirect to={signedInTo}/>
                                      : user.id ? <Component /> : <Redirect to={unsignedInTo}/>
          }
        />
      }
      {
        render && 
        <Route 
          {...restProps}
          render={(props) => signedInTo 
                                  ? !user.id ? render(props) : <Redirect to={signedInTo}/>
                                  : user.id ? render(props) : <Redirect to={unsignedInTo}/>
          }
        />
      }
    </>
    //<Route 
    //  {...restProps}
    //  render={(props) => {
    //    return user.id ? <Component {...props} /> : <Redirect to='/'/>
    //  }}
    ///>
  );
}

const mapStateToProps = ({user}) => {
  return {
    user,
  }
}

export default connect(mapStateToProps)(PrivateRoute);