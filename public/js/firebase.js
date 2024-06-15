// import dotenv from 'dotenv';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// // Load environment variables from .env file
// dotenv.config();

const firebaseConfig = {
    // apiKey: process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId: process.env.PROJECT_ID,
    // storageBucket: process.env.STORAGE_BUCKET,
    // messagingSenderId: process.env.MESSAGING_SENDER_ID,
    // appId: process.env.APP_ID,
    apiKey: "AIzaSyC9OFvAwAtmVbfXZ9Z2D1Qc1-EklaO_jMY",
    authDomain: "blogging-website-c436a.firebaseapp.com",
    projectId: "blogging-website-c436a",
    storageBucket: "blogging-website-c436a.appspot.com",
    messagingSenderId: "228610224240",
    appId: "1:228610224240:web:2205e740d3c42a06ba84b5"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);

const logoutUser = () => {
    auth.signOut().then(() => {
        console.log('User signed out successfully');
        // Handle logout success, e.g., redirect or reload if in a browser context
        // Example: location.reload(); // Adjust as per your application's context
    }).catch(error => {
        console.error('Error signing out:', error);
    });
};

export { db, auth, logoutUser };
