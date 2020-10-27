import {useState, useEffect} from 'react';
import {auth} from '../../firebase';

const useAuth = () => {
  // const [currentUser, setcurrentUser] = useState({});

  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(u => {
  //     setUser(u);
  //   });

  //   return () => {
  //     unsubscribe();
  //   }
  // }, []);

  return {
    signUp,
    signIn,
    // user,
  };
}

export default useAuth;