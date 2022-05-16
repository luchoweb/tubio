import Head from "next/head";

import PrivateLayout from "../../components/layouts/private";

function DashboardPage() {
  return (
    <>
      <Head>
        <title>Panel &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <section className="dashboard pt-4 pb-4 bg-light">
          <div className="container">
            <h1>Panel</h1>
          </div>
        </section>
      </PrivateLayout>
    </>
  )
}

export default DashboardPage;