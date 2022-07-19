import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteBiz, getBizById } from "../../../../lib/api";

import PrivateLayout from "../../../../components/layouts/private";

function DeleteProfile({ biz }) {
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemoveBiz = async (idBiz) => {
    const response = await deleteBiz(idBiz);
    if ( response?.code === 200 )
      setIsRemoved(true);
  }

  return (
    <>
      <Head>
        <title>Eliminar perfil &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container text-center pt-2">
            <h3 className="mb-5">Eliminar perfil</h3>

            { isRemoved || !biz?.id ? (
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

                <button onClick={() => handleRemoveBiz(biz?.id)} className="btn btn-danger btn-lg ms-4">
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

export async function getServerSideProps({ query }) {
  const data = await getBizById(query.id);

  return {
    props: {
      biz: data,
    }
  }
}

export default DeleteProfile;
