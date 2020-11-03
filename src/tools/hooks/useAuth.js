import {useState, useEffect} from 'react';
import {auth} from '../../firebase';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    })

    return unsubscribe();
  }, []);

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

  const changeEmail = (email) => {
    return currentUser.updateEmail(email);
  }

  const changePassword = (password) => {
    return currentUser.updatePassword(password);
  }

  return {
    signUp,
    signIn,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
  };
}

export default useAuth;