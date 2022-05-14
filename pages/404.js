import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layouts/layout";

function NotFoundage() {
  return (
    <>
      <Head>
        <title>Error 404 &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Layout>
        <div className="container pt-5 pb-5 text-center">
          <h1>Página no encontrada</h1>
          <p><Link href="/">Volver al inicio</Link></p>
        </div>
      </Layout>
    </>
  )
}

export default NotFoundage;