import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import PrivateLayout from "../../../../components/layouts/private";

function DeleteProfile() {
  const [isRemoved, setIsRemoved] = useState(false);
  return (
    <>
      <Head>
        <title>Eliminar perfil &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container text-center pt-2">
            <h3 className="mb-5">Eliminar perfil</h3>

            { isRemoved ? (
              <>
                <p className="m-0 mb-5">
                  <i className="icon icon-check-circle me-2"></i>
                  <span>El perfil ha sido eliminado.</span>
                </p>

                <Link href="/admin/dashboard">
                  <a className="btn btn-dark">
                    <i className="icon icon-chevron-left me-2"></i>
                    <span>Ir al panel</span>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <div className="alert alert-warning pt-3 pb-3 mb-5 m-auto">
                  <p className="m-0">
                    Esta acción es irreversible, la información se eliminará y no hay lugar a reembolso.
                  </p>
                </div>

                <Link href="/admin/dashboard">
                  <a className="btn btn-outline-dark">
                    <i className="icon icon-chevron-left me-2"></i>
                    <span>Volver</span>
                  </a>
                </Link>

                <button onClick={() => console.log('borrado')} className="btn btn-danger btn-lg ms-4">
                  <span>Eliminar</span>
                  <i className="icon icon-trash ms-2"></i>
                </button>
              </>
            )}
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default DeleteProfile;
