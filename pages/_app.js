import Head from 'next/head';
import Script from 'next/script';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import '../styles/components/layouts/layout.scss';
import '../styles/components/layouts/business.scss';
import '../styles/components/layouts/private.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />

      <Script src="https://kit.fontawesome.com/4e1f6b21a2.js" strategy="afterInteractive"></Script>
    </>
  )
}