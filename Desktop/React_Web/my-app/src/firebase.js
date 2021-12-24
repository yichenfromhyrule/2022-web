import * as firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyAtXjoeWoLnwjqkp9D_X4oqb4q76MV4zkw",
  authDomain: "web-1169c.firebaseapp.com",
  databaseURL: "https://web-1169c-default-rtdb.firebaseio.com/",
  projectId: "web-1169c",
  storageBucket: "web-1169c.appspot.com",
  messagingSenderId: "173430208077",
  appId: "1:173430208077:web:b27bb53cf0a469739f8e04",
  measurementId: "G-XTBL7YBJ6Z"
};

firebase.initializeApp(config);

export default firebase.database();
