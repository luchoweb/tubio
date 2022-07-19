import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../firebase/authUserContext";
import { deleteBiz, getBizById } from "../../../../lib/api";

import PrivateLayout from "../../../../components/layouts/private";

function DeleteProfile({ biz }) {
  console.log(biz)
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const [isRemoved, setIsRemoved] = useState(false);
  const [ disableBtn, setDisableBtn ] = useState(true);

  const handleRemoveBiz = async (idBiz) => {
    const response = await deleteBiz(idBiz);
    if ( response?.code === 200 )
      setIsRemoved(true);
  }

  useEffect(() => {
    console.log(authUser?.uid)
    if ( authUser && biz && authUser?.uid !== biz?.user_uid ) {
      router.push('/admin/dashboard');
    } else {
      setDisableBtn(false);
    }
  }, [biz, authUser, loading]);

  return (
    <>
      <Head>
        <title>Eliminar perfil &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className={`container text-center pt-2 ${disableBtn ? 'd-none' : 'd-block'}`}>
            <h3 className="mb-5">Eliminar perfil: <small>@{biz?.username}</small></h3>

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
                    Esta a punto de eliminar el perfil. Esta acción es irreversible y deberá volver a crear el perfil.
                  </p>
                </div>

                <Link href="/admin/dashboard">
                  <a className="btn btn-outline-dark">
                    <i className="icon icon-chevron-left me-2"></i>
                    <span>Volver</span>
                  </a>
                </Link>

                <button onClick={() => handleRemoveBiz(biz?.id)} className="btn btn-danger btn-lg ms-4" disabled={disableBtn}>
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
