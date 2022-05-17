import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authUserContext';

const LoggedIn = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/admin');
    } else if( authUser ) {
      if ( !localStorage.getItem('userData') ) {
        localStorage.setItem("userData", JSON.stringify(
          {
            email: authUser.email,
            uid: authUser.uid
          }
        ));
      }
    }
  }, [authUser, loading]);

  return children;
}

export default LoggedIn;