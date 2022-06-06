import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authUserContext';

const LoggedIn = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/admin');
    } else if( authUser ) {
      setIsLoading(false);

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

  return isLoading ? (<h4 className='fw-normal m-0 mt-5 text-center'>Cargando...</h4>) : children;
}

export default LoggedIn;