import Head from "next/head";

import PrivateLayout from "../../../components/layouts/private";

function PayProfile() {
  const titlePage = 'Comprar nuevo perfil';

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container">
            <h3>{titlePage}</h3>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default PayProfile;
