const requestOptions = {
method: 'GET',
headers: {
    'Accept': 'application/json',
    'Authorization':'Bearer bc4e32867-3c28-4745-8afc-2bcc4dc190f1'
},
};
  
export {requestOptions}



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD_m0GZxtA7Nf05_OeFKC6_UMsfwXkDqPo",
  authDomain: "coinbase-1ac10.firebaseapp.com",
  projectId: "coinbase-1ac10",
  storageBucket: "coinbase-1ac10.appspot.com",
  messagingSenderId: "204614415031",
  appId: "1:204614415031:web:b64f7f48546c779a2a1332"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)

const auth=getAuth(app)

export{db};

export {auth};