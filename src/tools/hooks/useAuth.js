import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';

const useAuth = () => {
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return {
    signUp,
    signIn,
  }
}

export default useAuth;