import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLXzHSYQYLOJBTcJzMXBIKNJP5bc1vY9Q",
  authDomain: "where-is-waldo-89199.firebaseapp.com",
  projectId: "where-is-waldo-89199",
  storageBucket: "where-is-waldo-89199.appspot.com",
  messagingSenderId: "692400535804",
  appId: "1:692400535804:web:7a780a9e8717b328a63f79"
};

var app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default db;