
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB82ycyY4kLCAOyBAX_STUsNF54HAFb4Lw",
  authDomain: "react-redux-crud-949a1.firebaseapp.com",
  projectId: "react-redux-crud-949a1",
  storageBucket: "react-redux-crud-949a1.appspot.com",
  messagingSenderId: "304270218685",
  appId: "1:304270218685:web:d68a0e7053c4459908eed4",
  measurementId: "G-7C6N4JEQMV"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;


