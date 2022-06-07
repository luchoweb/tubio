import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllBizByUid } from "../../lib/api";

import PrivateLayout from "../../components/layouts/private";
import BizCard from "../../components/bizCard";
import AddProfileBtn from "../../components/addProfileBtn";

function DashboardPage() {
  const [businesses, setBusinesses] = useState(undefined);
  const [error, setError] = useState(null);
  const [freeProfile, setFreeProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await getAllBizByUid(userData.uid);
        setBusinesses(res.businesses);

        const freeBiz = res.businesses.filter(biz => biz.is_free > 0).length;
        setFreeProfile(freeBiz);
      } catch(e) {
        setError(e.message);
      }
    }

    if ( !businesses )
      fetchData();
  }, [businesses]);

  return (
    <>
      <Head>
        <title>Panel &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section className="dashboard">
          <div className="container">
            <h1 className="display-6 mb-5">Panel</h1>
            <div className="row align-items-stretch justify-content-center justify-content-md-around justify-content-lg-start">
              { !error ? (
              <>
               { businesses && businesses.length ? businesses.map((biz, index) => (
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={`k-${index}`}>
                  <BizCard biz={biz} />
                </div>
                )) : '' }

              { businesses && freeProfile === 0 ? (
                <div className="col-12 col-md-6 col-lg-3 mb-4">
                  <AddProfileBtn info={{
                    text: 'Crear nuevo perfil',
                    href: '/admin/profile/new',
                    icon: 'user-plus'
                  }} />
                </div>
              ) : (
                <div className={`${freeProfile > 0 ? 'd-block' : 'd-none'} col-12 col-md-6 col-lg-3 mb-4`}>
                  <AddProfileBtn info={{
                    text: 'Comprar un nuevo perfil',
                    href: '/admin/profile/pay',
                    icon: 'user-plus',
                    price: '4.99'
                  }} />
                </div>
              )}
              </>
              ) : (
                <div className="alert alert-danger">
                  <p className="m-0">Ha ocurrido un error. <strong>Por favor refresque la página</strong>.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default DashboardPage;
