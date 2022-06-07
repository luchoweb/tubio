import Head from "next/head";
import { getBizById } from "../../../../lib/api";
import FormBiz from "../../../../components/forms/business";

import PrivateLayout from "../../../../components/layouts/private";

function EditProfile({ biz }) {
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

            <FormBiz action="update" bizData={biz} />
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

export default EditProfile;
