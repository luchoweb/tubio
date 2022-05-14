import Head from 'next/head';
import { useState, useEffect } from 'react';

import Layout from '../components/layouts/layout';
import BusinessLayout from '../components/layouts/business';
import LinkBtn from '../components/link';

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
          <style>
            {`body {
              background-color: ${info.biz.background} !important;
              color: ${info.biz.text_color} !important
            }

            .biz-links-link {
              border-color: ${info.biz.text_color};
              color: ${info.biz.text_color}
            }

            .biz-copy {
              color: ${info.biz.text_color}
            }`}
          </style>
        </Head>
        <BusinessLayout>
          <header className='biz-info pt-5 mb-5 text-center'>
            <figure className='biz-info-avatar mb-3'>
              <img src={info.biz.avatar} alt={info.biz.name} />
            </figure>
            <h1 className='biz-info-name'>
              {info.biz.name}
              { info.biz.verified > 0 && (
                <span className='biz-verified ms-2'>
                  <i className="fa fa-circle-check" title='Verified'></i>
                </span>
              )}
            </h1>
          </header>
          <nav className='biz-links mb-5'>
            <ul className='biz-links-list'>
              { info.links.length ? info.links.map((link, index) => (
                <LinkBtn data={link} key={`Link-${index}`} />
              )) : (
                <p className='biz-copy'>No hay links para mostrar.</p>
              ) }
            </ul>
          </nav>
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
  const { NODE_ENV, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_PORT } = process.env;
  const res = await fetch(`http${NODE_ENV !== 'development' ? 's' : ''}://${NEXT_PUBLIC_API_URL}:${NEXT_PUBLIC_API_PORT}/business/@${context.query.business}`)
  const info = await res.json();
  return { props: { info } }
}

export default Business;