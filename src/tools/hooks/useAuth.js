// import {useState, useEffect} from 'react';
import {auth} from '../../firebase';

const useAuth = () => {
  // const [currentUser, setcurrentUser] = useState({});

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  }

  return {
    signUp,
    signIn,
    logout,
    resetPassword,
  };
}

export default useAuth;