import Head from 'next/head';
import Script from 'next/script';

import  { AuthUserProvider } from "../firebase/authUserContext";

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import '../styles/components/layouts/layout.scss';
import '../styles/components/layouts/business.scss';
import '../styles/components/layouts/private.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta property="fb:app_id" content="352618018108394" />
        <script type="application/ld+json">
        {`
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "${process.env.NEXT_PUBLIC_APP_NAME}",
          "url": "${process.env.NEXT_PUBLIC_APP_URL}",
          "logo": "${process.env.NEXT_PUBLIC_APP_URL}/social.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "300-829-1060",
            "contactType": "customer service",
            "areaServed": "CO",
            "availableLanguage": ["es"]
          },
          "sameAs": [,
            "https://instagram.com/tubio.link"
          ]
        `}
        </script>

        {pageProps?.info?.biz ? (
          <>
            <title>@{pageProps?.info?.biz.username} &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
            <meta property="og:title" content={`@${pageProps?.info?.biz.username} &bull; ${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta property="og:description" content={`Perfil de @${pageProps?.info?.biz.username} en TuBio`} />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/${pageProps?.info?.biz.username}`} />
            <meta property="og:site_name" content={`@${pageProps?.info?.biz.username} &bull; ${process.env.NEXT_PUBLIC_APP_NAME}`} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/uploads/${pageProps?.info?.biz.username}/avatar.webp`} />
            <meta property="og:type" content="profile" />
            <meta property="profile:username" content={pageProps?.info?.biz.username} />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600&display=swap" rel="stylesheet" />
          </>
          ) : (
          <>
            <meta property="og:type" content="website" />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/social.png`} />
          </>
          )}
      </Head>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}