import { useState, useEffect } from 'react';

import Layout from '../components/layouts/layout';
import BusinessLayout from '../components/layouts/business';

const Business = ({ biz }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ( biz ) {
      setLoading(false);
    }
  }, [biz]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !biz.message ? (
          <BusinessLayout>
            <div>Business: {biz.username}</div>
          </BusinessLayout>
        ) : (
          <Layout>
            <p>{biz.message}</p>
          </Layout>
        )
      }
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:4000/business/@${context.query.business}`)
  const biz = await res.json();
  return { props: { biz } }
}

export default Business;