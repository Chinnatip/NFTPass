// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig =  {
  apiKey: "AIzaSyDJZIsW9h3qHeyQFaRyvycH3NFpED-YtFU",
  authDomain: "galleryst-f7fe1.firebaseapp.com",
  projectId: "galleryst-f7fe1",
  storageBucket: "galleryst-f7fe1.appspot.com",
  messagingSenderId: "238070777772",
  appId: "1:238070777772:web:f2b589dd01a9c3960e9c09",
  measurementId: "G-18KXBB9L16"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;