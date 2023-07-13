// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
//fireStore
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
//storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseInstance = initializeApp(firebaseConfig);
export const authService = getAuth();
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(authService, email, password);
};
export const signIN = (email, password) => {
  return signInWithEmailAndPassword(authService, email, password);
};
export const googleProvider = new GoogleAuthProvider();
export const socialLogin = (name) => {
  let provider;
  if (name === "google") {
    provider = googleProvider;
  } else {
    throw new Error("Not supported provider");
  }
  return signInWithPopup(authService, provider);
};
export const logOut = () => {
  return signOut(authService);
};
//fireStore data save
export const dbService = getFirestore();
export const addTweet = async (tweet, userObj, attachmentUrl) => {
  const docRef = await addDoc(collection(dbService, "tweets"), {
    tweet,
    attachmentUrl,
    createdAt: Date.now(),
    creatorId: userObj.uid,
  });
  // console.log("Document written with ID: ", docRef.id);
};
//Storage
export const storageService = getStorage();
export const uploadFile = async (attachment, userObj) => {
  const storageRef = ref(storageService, `${userObj.uid}/${Date.now()}`);
  const response = await uploadString(storageRef, attachment, "data_url");
  const attachmentUrl = await getDownloadURL(response.ref);
  return attachmentUrl;
};
export const getMyTweets = async (userObj) => {
  let myTweets = [];
  const q = query(
    collection(dbService, "tweets"),
    where("creatorId", "==", userObj.uid),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    myTweets.push({ id: doc.id, ...doc.data() });
  });
};
