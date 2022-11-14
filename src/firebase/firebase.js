import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC-c1ICZImqohHHIH5sMwG7cZcPwxhU4to",
    authDomain: "ecommerce-project-6147f.firebaseapp.com",
    projectId: "ecommerce-project-6147f",
    storageBucket: "ecommerce-project-6147f.appspot.com",
    messagingSenderId: "182059332377",
    appId: "1:182059332377:web:fb4ad3ac2e8dc5026a4b88"
};

firebase.initializeApp(firebaseConfig)
export default firebase;