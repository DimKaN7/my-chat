import firebase from 'firebase';

const firebaseApp =  firebase.initializeApp(
  {
    apiKey: "AIzaSyCvzP1YdZSDtNQSCacXVLxaKm8Ob0aEkZg",
    authDomain: "rechatik.firebaseapp.com",
    databaseURL: "https://rechatik.firebaseio.com",
    projectId: "rechatik",
    storageBucket: "rechatik.appspot.com",
    messagingSenderId: "1067850249564",
    appId: "1:1067850249564:web:143ea77a061a1a350c7d99"
  }
);

export const db = firebaseApp.firestore();