import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import PrivateLayout from "../../components/layouts/private";

function DashboardPage() {
  const [businesses, setBusinesses] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const res = await fetch(`http${process.env.NODE_ENV !== 'development' ? 's' : ''}://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/business/uid/${userData.uid}`)
        const businesses = await res.json();
        setBusinesses(businesses.businesses);
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
                    <div className="card-header bg-white pt-3 pb-3">
                      <h4 className="m-0 card-title">{biz.name}</h4>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        {biz.address && (
                          <>
                            {biz.address}
                            <br />
                          </>
                        )}
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
                        <i className="fa fa-eye me-1"></i>
                        <span>Ver perfil</span>
                      </a>

                      <span className="me-1 ms-1"></span>

                      <Link href={`/admin/profile/edit/${biz.id}`}>
                        <a className="btn btn-sm btn-outline-dark mb-2">
                          <i className="fa fa-pencil me-1"></i>
                          <span>Editar</span>
                        </a>
                      </Link>

                      <span className="me-1 ms-1"></span>

                      <Link href={`/admin/profile/delete/${biz.id}`}>
                        <a className="btn btn-sm btn-danger mb-2">
                          <i className="fa fa-trash me-1"></i>
                          <span>Eliminar</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                )) : '' }

              { businesses && businesses.length === 0 ? (
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
