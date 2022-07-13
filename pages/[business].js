import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../components/layouts/layout';
import BusinessLayout from '../components/layouts/business';

import LinkBtn from '../components/link';
import { getBiz } from '../lib/api';


const Business = ({ biz }) => {
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState('Cargando...');
  const [username, setUsername] = useState('Cargando...');

  useEffect(() => {
    if ( biz ) {
      setLoading(false);

      if ( !biz.message ) {
        setPageTitle(biz.name);
        setUsername(biz.username);

        biz.links.sort((a, b) => a.order - b.order);
      } else {
        setPageTitle('Error 404');
      }
    }
  }, [biz]);

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

  const avatarLoader = ({ src, width, quality }) => {
    console.log('src', src);
    return `https://media.tubio.co/${src}/avatar.webp?w=${width}&q=${quality || 75}`
  }

  return (
    loading ? (
      <div className='container pt-5 text-center'>
        <h4 className='fw-normal m-0'>Cargando...</h4>
      </div>
    ) : !biz.message ? (
      <>
        <BusinessLayout>
          <a
            className="d-lg-none btn-share btn btn-sm btn-outline-dark"
            style={{borderColor: biz.text_color}}
            onClick={(e) => handleShare(e)}
          >
            <small style={{color: biz.text_color}}>
              <i className='icon icon-external-link'></i>
              <span className='d-none d-md-inline ms-2'>
                Compartir
              </span>
            </small>
          </a>

          <a
            href="/admin"
            className="btn-sign-in btn btn-sm btn-outline-dark"
            style={{borderColor: biz.text_color}}
          >
            <small style={{color: biz.text_color}}>
              <i className='icon icon-user'></i>
              <span className='d-none d-md-inline ms-2'>
                Ingresar
              </span>
            </small>
          </a>

          <header className='w-100 biz-info pt-5 pb-4 mb-4 text-center' style={{
            backgroundColor: biz.background
          }}>
            <figure className='biz-info-avatar mb-4'
              style={{
                backgroundColor: biz.text_color,
                border: `3px solid ${biz.text_color}`
              }}
            >
              <Image
                loader={avatarLoader}
                src={`${username}`}
                alt={biz.name}
                priority={true}
                width={144}
                height={144}
              />
            </figure>
            <h1 className='biz-info-name' style={{color: biz.text_color}}>
              {biz.name}
              { biz.verified > 0 && (
                <span className='biz-verified ms-2'>
                  <i className="icon icon-verified" title='Perfil Oficial'></i>
                </span>
              )}
            </h1>

            { biz.address ? (
              <p className='m-0 biz-info-address' style={{color: biz.text_color}}>
                {biz.address}
              </p>
            ) : ''}

            { biz.city || biz.country ? (
              <p className='m-0 biz-info-city' style={{color: biz.text_color}}>
                {biz.city ? (
                  <span>{biz.city}</span>
                ) : ''}

                {biz.country ? (
                  <span>{biz.city ? `,` : ''} {biz.country}</span>
                ) : ''}
              </p>
            ) : ''}
          </header>
          <nav className='biz-links mb-5'>
            <ul className='biz-links-list'>
              { biz.links.length ? biz.links.map((link, index) => (
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
      biz: data,
    }
  }
}

export default Business;
