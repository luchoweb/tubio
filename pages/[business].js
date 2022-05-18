import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/layouts/layout';
import BusinessLayout from '../components/layouts/business';

import LinkBtn from '../components/link';
import { getAllBiz, getPreviewBiz } from '../lib/api';


const Business = ({ info, posts, preview }) => {

  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [username, setUsername] = useState('Loading...');

  useEffect(() => {
    if ( info ) {
      setLoading(false);

      if ( !info.message ) {
        setPageTitle(info.biz.name);
        setUsername(info.biz.username)
      } else {
        setPageTitle('Error 404');
      }
    }
  }, [info]);

  return (
    loading ? (
      <div className='container pt-5 text-center'>
        <h4 className='fw-normal m-0'>Cargando...</h4>
      </div>
    ) : !info.message ? (
      <>
        <Head>
          <title>{pageTitle} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
          <meta property="og:title" content={`@${username} &bull; ${process.env.NEXT_PUBLIC_APP_NAME}`} />
          <meta property="og:description" content={`Perfil de @${username} en TuBio`} />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/${username}`} />
          <meta property="og:site_name" content={`@${username} &bull; ${process.env.NEXT_PUBLIC_APP_NAME}`} />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/uploads/${username}/avatar.webp`} />
        </Head>
        <BusinessLayout>
          <header className='w-100 biz-info pt-4 pb-4 mb-5 text-center' style={{
            backgroundColor: info.biz.background
          }}>
            <figure className='biz-info-avatar mb-4'>
              <img src={`/uploads/${username}/avatar.webp`} alt={info.biz.name} />
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
          <title>{pageTitle} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
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

export async function getStaticProps({ params, preview = false }) {
  const data = await getPreviewBiz(params.business);

  return {
    props: {
      preview,
      info: data,
    },
  }
}

export async function getStaticPaths() {
  const allBiz = await getAllBiz();

  return {
    paths: allBiz.map((biz) => `/${biz.username}`) || [],
    fallback: true,
  }
}

export default Business;