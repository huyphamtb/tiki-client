import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8BnD86MnkULFatXoAWiOCF72VzFPLrVs",
  authDomain: "tiki-client.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
