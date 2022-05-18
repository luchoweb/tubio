import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllBizByUid } from "../../lib/api";

import PrivateLayout from "../../components/layouts/private";

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
                <div className="col-9 col-md-6 col-lg-3 mb-4" key={`k-${index}`}>
                  <div className="card h-100">
                    <div className="card-header pt-3 pb-3"
                      style={{
                        backgroundColor: biz.background,
                        color: biz.text_color
                      }}
                    >
                      <h4 className="m-0 card-title">{biz.name}</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        {biz.city && (
                          <>
                            {biz.city}
                            <br />
                          </>
                        )}
                        {biz.country && biz.country}
                      </p>
                    </div>

                    <div className="card-footer pt-3">
                      <a href={`/${biz.username}`} className="btn btn-sm btn-outline-dark mb-2" target="_blank">
                        <i className="fa fa-eye"></i>
                      </a>

                      <span className="me-1 ms-1"></span>

                      <Link href={`/admin/profile/edit/${biz.id}`}>
                        <a className="btn btn-sm btn-primary mb-2">
                          <i className="fa fa-pencil"></i>
                        </a>
                      </Link>

                      <span className="me-1 ms-1"></span>

                      <Link href={`/admin/profile/delete/${biz.id}`}>
                        <a className="btn btn-sm btn-danger mb-2">
                          <i className="fa fa-trash"></i>
                        </a>
                      </Link>

                      <div className={`flag${biz.is_free === 0 ? ' flag-bg-warning text-dark' : ' flag-bg-dark'}`}>
                        {biz.is_free === 0 ? 'Pago' : 'Gratis'}
                      </div>
                    </div>
                  </div>
                </div>
                )) : '' }

              { businesses && freeProfile === 0 ? (
                <div className="col-9 col-md-6 col-lg-3 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                    <Link href="/admin/profile/new">
                      <a className="d-flex flex-column align-items-center justify-content-center h-100">
                        <i className="fa fa-plus fa-4x text-muted"></i>
                        <p className="m-0 text-muted">Crear nuevo perfil</p>
                      </a>
                    </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-9 col-md-6 col-lg-3 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                    <Link href="/admin/profile/pay">
                      <a className="d-flex flex-column align-items-center justify-content-center h-100">
                        <i className="fa fa-plus fa-4x text-muted"></i>
                        <p className="m-0 mt-2 text-center text-muted">
                          <span className="d-block">Comprar un nuevo perfil</span>
                          <span>$4.99 anuales</span>
                        </p>
                      </a>
                    </Link>
                    </div>
                  </div>
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
