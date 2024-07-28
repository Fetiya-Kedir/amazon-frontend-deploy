import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCGplmr8Vh90LhJaCB0JCH7jzMcFNP_ENU',
	authDomain: 'clone-32915.firebaseapp.com',
	projectId: 'clone-32915',
	storageBucket: 'clone-32915.appspot.com',
	messagingSenderId: '701364101867',
	appId: '1:701364101867:web:0f7891464392c50bb094ae',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
