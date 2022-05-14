import Head from "next/head";

import Layout from "../components/layouts/layout";

function HomePage() {
  return (
    <>
      <Head>
        <title>BizBio &bull; Todo en 1 enlace</title>
      </Head>
      <Layout>
        <div>Welcome to Next.js!</div>
      </Layout>
    </>
  )
}

export default HomePage;