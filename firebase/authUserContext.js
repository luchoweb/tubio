import { createContext, useContext } from 'react'
import useFirebaseAuth from './useFirebaseAuth';

const authUserContext = createContext({
  formatAuthUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  sendPasswordResetEmail: async () => {},
  signOut: async () => {},
  signInWithRedirect: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);