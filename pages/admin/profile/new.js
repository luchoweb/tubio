import Head from "next/head";

import PrivateLayout from "../../../components/layouts/private";

function NewProfile() {
  return (
    <>
      <Head>
        <title>Nuevo perfil &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section>
          <div className="container">
            <p>New profile</p>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default NewProfile;
