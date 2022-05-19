import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/layouts/layout';
import BusinessLayout from '../components/layouts/business';

import LinkBtn from '../components/link';
import { getBiz } from '../lib/api';


const Business = ({ info }) => {

  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [username, setUsername] = useState('Loading...');

  useEffect(() => {
    if ( info ) {
      setLoading(false);

      if ( !info.message ) {
        setPageTitle(info.biz.name);
        setUsername(info.biz.username);

        // order links
        info.links.sort((a, b) => a.order - b.order);
      } else {
        setPageTitle('Error 404');
      }
    }
  }, [info]);

  const handleShare = async (e) => {
    e.preventDefault();
  
    const shareData = {
      title: pageTitle,
      text: `Perfil de @${username} en TuBio`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${username}`
    }

    try {
      await navigator.share(shareData)
      console.log('Shared!');
    } catch(err) {
      console.log(err);
    }
  }

  return (
    loading ? (
      <div className='container pt-5 text-center'>
        <h4 className='fw-normal m-0'>Cargando...</h4>
      </div>
    ) : !info.message ? (
      <>
        <BusinessLayout>
          <a
            className="d-lg-none btn-share btn btn-sm btn-outline-dark"
            style={{borderColor: info.biz.text_color}}
            onClick={(e) => handleShare(e)}
          >
            <small style={{color: info.biz.text_color}}>
              <i className='icon icon-share-square'></i>
              <span className='d-none d-md-inline ms-2'>
                Compartir
              </span>
            </small>
          </a>

          <Link href="/admin">
            <a
              className="btn-sign-in btn btn-sm btn-outline-dark"
              style={{borderColor: info.biz.text_color}}
            >
              <small style={{color: info.biz.text_color}}>
                <i className='icon icon-user'></i>
                <span className='d-none d-md-inline ms-2'>
                  Ingresar
                </span>
              </small>
            </a>
          </Link>

          <header className='w-100 biz-info pt-5 pb-4 mb-5 text-center' style={{
            backgroundColor: info.biz.background
          }}>
            <figure className='biz-info-avatar mb-4'
              style={{
                backgroundColor: info.biz.text_color,
                border: `3px solid ${info.biz.text_color}`
              }}
            >
              <img src={`/uploads/${username}/avatar.webp`} alt={info.biz.name} />
            </figure>
            <h1 className='biz-info-name' style={{color: info.biz.text_color}}>
              {info.biz.name}
              { info.biz.verified > 0 && (
                <span className='biz-verified ms-2'>
                  <i className="icon icon-verified" title='Perfil Oficial'></i>
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

export async function getServerSideProps({ query }) {
  const data = await getBiz(query.business);

  return {
    props: {
      info: data,
    }
  }
}

export default Business;
