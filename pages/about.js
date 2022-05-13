import Head from "next/head";

import Layout from "../components/layouts/layout";

function AboutPage() {
  return (
    <>
      <Head>
        <title>About us &bull; BizBio</title>
      </Head>
      <Layout>
        <div>About Next.js!</div>
      </Layout>
    </>
  )
}

export default AboutPage;