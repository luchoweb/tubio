import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import PrivateLayout from "../../../components/layouts/private";
import FormBiz from "../../../components/forms/business";

import { getFreeBiz } from "../../../lib/api";

function NewProfile() {
  const titlePage = 'Nuevo perfil';

  const router = useRouter();

  const [error, setError] = useState(null);
  const [freeProfile, setFreeProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await getFreeBiz(userData.uid);
        setFreeProfile(res);
      } catch(e) {
        setError(e.message);
      }
    }

    if ( !freeProfile )
      fetchData();

    if ( freeProfile >= 1 )
      router.push('/admin/profile/pay');
  }, [freeProfile]);

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="alert alert-dark pt-2 pb-2 mb-5 text-center" style={{marginTop: '-3rem'}}>
            <p className="m-0">
              <i className='icon icon-info-circle me-2'></i>
              <span>Antes de crear este perfil recuerde que esta información será pública.</span>
            </p>
          </div>
          <div className="container">
            <h3 className="mb-5 text-center text-lg-start">{titlePage}</h3>

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
