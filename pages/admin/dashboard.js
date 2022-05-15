import Head from "next/head";

import LoggedIn from "../../firebase/loggedIn";
import PrivateLayout from "../../components/layouts/private";

function DashboardPage() {
  return (
    <>
      <Head>
        <title>Panel &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <PrivateLayout>
        <LoggedIn />
        <h1>Panel</h1>
      </PrivateLayout>
    </>
  )
}

export default DashboardPage;