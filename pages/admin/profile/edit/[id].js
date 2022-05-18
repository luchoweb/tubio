import Head from "next/head";

import PrivateLayout from "../../../../components/layouts/private";

function EditProfile() {
  const titlePage = 'Editar perfil';

  return (
    <>
      <Head>
        <title>{titlePage}l &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
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

export default EditProfile;
