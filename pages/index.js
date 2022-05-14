import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import Layout from "../components/layouts/layout";
import phoneScreen from "../images/phone-screen.png";
import appScreen from "../images/bizbio-profile.png";

function HomePage() {
  return (
    <>
      <Head>
        <title>BizBio &bull; 1 enlace para todo</title>
      </Head>
      <Layout>
        <section className="hero pt-5 pb-5 bg-light">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-6 col-lg-5 mb-5 mb-md-0">
                <h1 className="display-1 display-lg-2 hero-title mb-5 text-center text-md-start">1 enlace <br /> para todo</h1>
  
                <p className="hero-intro m-0 mb-5 text-center text-md-start">Crea y personaliza tu perfil personal o el de tu marca y enlaza todas tus redes sociales, página o tienda en linea, menú, etc, en 1 solo link y <strong>GRATIS</strong>.</p>

                <Link href="new">
                  <a className="btn btn-dark  d-block d-lg-inline-block me-lg-4">
                    <i className="fa fa-clipboard-user me-2"></i>
                    <span>Crear mi perfil</span>
                  </a>
                </Link>

                <a href="devstore" className="btn btn-outline-secondary d-block d-lg-inline-block mt-3 mt-lg-0" target="_blank">
                  <i className="fa fa-table-list me-2"></i>
                  <span>Ver demo</span>
                </a>

                <p className="m-0 mt-4">
                  <small>
                    <span>Al crear un perfil usted acepta nuestros </span>
                    <Link href="terms">
                      <a className="text-muted">términos y condiciones</a>
                    </Link>
                  </small>
                </p>
              </div>
              <div className="col-12 col-md-6 col-lg-5 text-center hero-col-img">
                <img src={appScreen.src} className="hero-col-img-screen" loading="lazy" />
                <Image src={phoneScreen} className="hero-col-img-phone" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default HomePage;