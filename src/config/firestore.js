// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Log environment variables
// console.log("API Key:", process.env.REACT_APP_API_KEY);
// console.log("Auth Domain:", process.env.REACT_APP_AUTH_DOMAIN);
// console.log("Project ID:", process.env.REACT_APP_PROJECT_ID);
// console.log("Storage Bucket:", process.env.REACT_APP_STORAGE_BUCKET);
// console.log("Messaging Sender ID:", process.env.REACT_APP_MESSAGING_SENDER_ID);
// console.log("App ID:", process.env.REACT_APP_APP_ID);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize启用 Firebase () and get a reference to the Firebase app
const app = initializeApp(firebaseConfig);

// Initialize启用 Cloud FireStore and get a reference to the service
// db refers to the firestore database
export const db = getFirestore(app);


// NOTE
// Hierarchy: 
// Firestore(database) -> Collection(table) -> Document (Record)