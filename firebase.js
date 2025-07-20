import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB9F_Se7fDJbiGrPsoRcOtVos7_hpEJC2U",
  authDomain: "farmart-63c5e.firebaseapp.com",
  projectId: "farmart-63c5e",
  storageBucket: "farmart-63c5e.appspot.com",
  messagingSenderId: "938670022197",
  appId: "1:938670022197:web:2534bf058c297a25285b7c",
  measurementId: "G-0X0RM1DB3L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
