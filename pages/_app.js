import Layout from '../components/layouts/layout';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.scss';
import '../styles/components/layouts/layout.scss';
import '../styles/components/layouts/business.scss';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}