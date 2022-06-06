import { useState, useEffect } from 'react'
import firebase from './firebase';
const provider = new firebase.auth.FacebookAuthProvider();

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true);
    setAuthUser(formatAuthUser(authState));    
    setLoading(false);

    if ( !authState.emailVerified )
      firebase.auth().currentUser.sendEmailVerification();
  };

  const signInWithEmailAndPassword = (email, password) => 
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email, password) => 
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const sendPasswordResetEmail = (email) => 
    firebase.auth().sendPasswordResetEmail(email);

  const signOut = () => {
    firebase.auth().signOut().then(clear);
    localStorage.removeItem('userData');
  }

  const signInWithRedirect = () =>
    firebase.auth().signInWithRedirect(provider);

// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    signInWithRedirect
  };
}