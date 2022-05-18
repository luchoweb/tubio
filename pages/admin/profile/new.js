import { useState, useEffect } from "react";
import Head from "next/head";

import PrivateLayout from "../../../components/layouts/private";
import FormBiz from "../../../components/forms/business";
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/count-uid/${userData.uid}`)
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
          <div className="alert alert-warning pt-2 pb-2 mb-5 text-center" style={{marginTop: '-3rem'}}>
            <p className="m-0">
              <i className='fa fa-warning me-2'></i>
              <span>Antes de crear este perfil recuerde que esta información será pública.</span>
            </p>
          </div>
          <div className="container">
            <h3 className="mb-5">{titlePage}</h3>

            { !error ? (
              <FormBiz />
            ) : (
              <div className="alert alert-danger mt-5">
                <p className="m-0">Ha ocurrido un error. <strong>Por favor refresque la página</strong>.</p>
              </div>
            )}
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default NewProfile;
