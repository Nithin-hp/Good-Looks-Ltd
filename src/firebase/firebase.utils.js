import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCDju0XvpV2QaQUmVReSx-hUfcMHwHYx9E",
  authDomain: "crowndb-c8204.firebaseapp.com",
  databaseURL: "https://crowndb-c8204.firebaseio.com",
  projectId: "crowndb-c8204",
  storageBucket: "crowndb-c8204.appspot.com",
  messagingSenderId: "606585315893",
  appId: "1:606585315893:web:b8def1ec4f3daa4de9477c",
  measurementId: "G-GTEQ93DXF9"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
