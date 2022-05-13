import Head from 'next/head';
import { useState, useEffect } from 'react';

import Layout from '../components/layouts/layout';
import BusinessLayout from '../components/layouts/business';

const Business = ({ info }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ( info ) {
      setLoading(false);
    }
  }, [info]);

  return (
    loading ? (
      <p>Loading...</p>
    ) : !info.message ? (
      <>
        <Head>
          <title>{info.biz.name} &bull; BizBio</title>
        </Head>
        <BusinessLayout>
          <div>Business: {info.biz.username}</div>
          <ul className='biz-links'></ul>
        </BusinessLayout>
      </>
    ) : (
      <>
        <Head>
          <title>{info.message}</title>
        </Head>
        <Layout>
          <p>{info.message}</p>
        </Layout>
      </>
    )
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:4000/business/@${context.query.business}`)
  const info = await res.json();
  return { props: { info } }
}

export default Business;