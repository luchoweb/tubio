import Head from "next/head";
import Link from "next/link";

import PrivateLayout from "../../../../components/layouts/private";

function DeleteProfile() {
  return (
    <>
      <Head>
        <title>Eliminar perfil &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container text-center pt-2">
            <div className="d-inline-block alert alert-danger pt-2 pb-2 mb-5">
              <p className="m-0">
                <i className="fa fa-warning me-1"></i>
                <span><strong>Cuidado</strong>. Esta acción es irreversible.</span>
              </p>
            </div>
  
            <h3 className="mb-4">¿Esta seguro que desea eliminar el perfil?</h3>

            <div>
              <Link href="/admin/dashboard">
                <a className="btn btn-outline-dark btn-lg">
                  <i className="fa fa-arrow-left me-2"></i>
                  <span>No</span>
                </a>
              </Link>

              <button onClick={() => console.log('borrado')} className="btn btn-danger btn-lg ms-4">
                <span>Si, eliminar</span>
                <i className="fa fa-trash ms-2"></i>
              </button>
            </div>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default DeleteProfile;
