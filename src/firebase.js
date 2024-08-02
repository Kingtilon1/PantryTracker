import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBZ7NgtqcxHIraSa49_KY84j9wfqJ0C5HU",
  authDomain: "pantrytracker-fd248.firebaseapp.com",
  projectId: "pantrytracker-fd248",
  storageBucket: "pantrytracker-fd248.appspot.com",
  messagingSenderId: "922987760022",
  appId: "1:922987760022:web:22c11b5e6a0610b8f3b5b7",
  measurementId: "G-D92QGREZ68"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };