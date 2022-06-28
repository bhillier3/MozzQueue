// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ_M8-L-tG7VVKHRqVsTbNQFm5m3AOeRo",
  authDomain: "mozzqueue.firebaseapp.com",
  projectId: "mozzqueue",
  storageBucket: "mozzqueue.appspot.com",
  messagingSenderId: "1075849951306",
  appId: "1:1075849951306:web:d361e77b3900af07dd4eb3",
  measurementId: "G-WJSNT972E7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

export default firebase