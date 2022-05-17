import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

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
          <title>{info.biz.name} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <BusinessLayout>
          <header className='w-100 biz-info pt-4 pb-4 mb-5 text-center' style={{
            backgroundColor: info.biz.background
          }}>
            <figure className='biz-info-avatar mb-4'>
              <img src={info.biz.avatar} alt={info.biz.name} />
            </figure>
            <h1 className='biz-info-name' style={{color: info.biz.text_color}}>
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
                <p className='biz-copy text-center'>No hay links para mostrar.</p>
              ) }
            </ul>
          </nav>
        </BusinessLayout>
      </>
    ) : (
      <>
        <Head>
          <title>Error 404 &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <Layout>
          <div className='container pt-5 pb-5'>
            <h1 className='mb-3'>Error</h1>
            <h5 className='m-0 fw-normal'>
              <span className='me-2'>El perfil que intenta ver no existe o ha sido eliminado.</span>
              <Link href="/"><a><strong>Volver al inicio</strong></a></Link>
            </h5>
          </div>
        </Layout>
      </>
    )
  );
}

export async function getServerSideProps(context) {
  const { NODE_ENV, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_PORT } = process.env;
  try {
    const res = await fetch(`http${NODE_ENV !== 'development' ? 's' : ''}://${NEXT_PUBLIC_API_URL}${NODE_ENV !== 'development' ? '' : ':'+NEXT_PUBLIC_API_PORT}/business/@${context.query.business}`)
    const info = await res.json();
    return { props: { info } }
  } catch(e) {
    return { props: { info: { message: 'error' } } }
  }
}

export default Business;