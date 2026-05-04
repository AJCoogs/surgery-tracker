import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfUmkv0VEQkuraAPKW2rmX67sI4hutUDc",
  authDomain: "surgery-tracker-7a7da.firebaseapp.com",
  databaseURL: "https://surgery-tracker-7a7da-default-rtdb.firebaseio.com",
  projectId: "surgery-tracker-7a7da",
  storageBucket: "surgery-tracker-7a7da.firebasestorage.app",
  messagingSenderId: "555390488660",
  appId: "1:555390488660:web:cb49e1c6cfdd7f8cc09dc1",
  measurementId: "G-9KGTV6L5VB"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
