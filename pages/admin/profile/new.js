import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../../../firebase/authUserContext";

import PrivateLayout from "../../../components/layouts/private";
import FormBiz from "../../../components/forms/business";

import { getFreeBiz } from "../../../lib/api";

function NewProfile() {
  const { authUser, loading } = useAuth();
  const titlePage = 'Nuevo perfil';

  const router = useRouter();

  const [error, setError] = useState(null);
  const [freeProfile, setFreeProfile] = useState(null);

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/admin');
    } else if( authUser ) {
      const fetchData = async () => {
        try {
          const res = await getFreeBiz(authUser.uid);
          setFreeProfile(res);
        } catch(e) {
          setError(e.message);
        }
      }
  
      if ( !freeProfile )
        fetchData();
  
      if ( freeProfile >= 1 )
        router.push('/admin/profile/pay');
    }
  }, [freeProfile]);

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="alert alert-secondary pt-1 pb-1 mb-5 text-center" style={{marginTop: '-3rem'}}>
            <p className="m-0">
              <i className='icon icon-info-circle me-2'></i>
              <small>Recuerde que esta información será pública.</small>
            </p>
          </div>
          <div className="container">
            <h3 className="mb-4 text-center text-lg-start">{titlePage}</h3>

            { !error ? (
              <FormBiz action="save" />
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
