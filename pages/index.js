import Head from "next/head";

import Layout from "../components/layouts/layout";

function HomePage() {
  return (
    <>
      <Head>
        <title>BizBio &bull; 1 link for all</title>
      </Head>
      <Layout>
        <div>Welcome to Next.js!</div>
      </Layout>
    </>
  )
}

export default HomePage;