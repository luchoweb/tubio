import { useState, useEffect } from "react";
import Head from "next/head";

import PrivateLayout from "../../../components/layouts/private";
import { useRouter } from "next/router";

function NewProfile() {
  const titlePage = 'Nuevo perfil';

  const router = useRouter();

  const [countBiz, setCountBiz] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await fetch(`http${process.env.NODE_ENV !== 'development' ? 's' : ''}://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/business/count-uid/${userData.uid}`)
        const count = await res.json();
        setCountBiz(count.count);
      } catch(e) {
        setError(e.message);
      }
    }

    if ( !countBiz )
      fetchCount();

    if ( countBiz >= 1 )
      router.push('/admin/profile/pay');
  }, [countBiz]);

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container">
            <h3>{titlePage}</h3>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default NewProfile;
