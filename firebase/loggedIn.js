import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './authUserContext';

const LoggedIn = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/admin');
    } else {
      router.push('/admin/dashboard');
    }
  }, [authUser, loading]);

  return;
}

export default LoggedIn;