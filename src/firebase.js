// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG99nl_hH_8GvqEpxGmT-Zc6xyVKHJKiI",
  authDomain: "test-app-9eac0.firebaseapp.com",
  databaseURL: "https://test-app-9eac0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-app-9eac0",
  storageBucket: "test-app-9eac0.appspot.com",
  messagingSenderId: "475645900729",
  appId: "1:475645900729:web:b6b025376cf9f1f9c1a868"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;