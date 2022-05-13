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
          <style>
            {`
            body {
              background-color: ${info.biz.background} !important;
              color: ${info.biz.text_color} !important
            }

            .biz-links-link {
              border-color: ${info.biz.text_color};
              color: ${info.biz.text_color}
            }

            .biz-copy {
              color: ${info.biz.text_color}
            }
          `}
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
                <li
                  className='biz-links-list-item mb-4'
                  key={`k-${index}`}
                >
                  <a
                    style={{
                      borderColor: link.color,
                      color: link.color
                    }}
                    href={link.link}
                    className='biz-links-link'
                    target="_blank"
                    rel='noopener'
                  >
                    <i className={`${link.icon} fa-2x me-4`}></i>
                    <span>{ link.title }</span>
                  </a>
                </li>
              )) : (
                <p>No links</p>
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
  const res = await fetch(`http://localhost:4000/business/@${context.query.business}`)
  const info = await res.json();
  return { props: { info } }
}

export default Business;