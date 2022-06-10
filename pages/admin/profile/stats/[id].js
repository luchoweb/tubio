import Head from "next/head";
import { getStatsBiz } from "../../../../lib/api";

import PrivateLayout from "../../../../components/layouts/private";

function StatsProfile({ stats }) {
  console.log(stats);
  const titlePage = 'Estadísticas';

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

export async function getServerSideProps({ query }) {
  const data = await getStatsBiz(query.id);

  return {
    props: {
      stats: data,
    }
  }
}

export default StatsProfile;