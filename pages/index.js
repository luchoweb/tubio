import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layouts/layout";
import phoneScreen from "../images/phone-screen.png";
import appScreen from "../images/bizbio-profile.png";

import { faqs } from "../helpers";

function HomePage() {
  const showFaq = id => {
    const faqs = document.querySelectorAll(`.faq .faq-question`);
    const faq = document.querySelector(`.faq[data-faq="${id}"] .faq-question`);

    if ( !faq.classList.contains('open') ) {
      faqs.forEach(faq => faq.classList.remove('open'));
      faq.classList.add('open');
    } else {
      faq.classList.remove('open');
    }
  }


  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} &bull; 1 enlace para todo</title>
        <meta name="description" content="Crea y personaliza tu perfil personal o el de tu marca y enlaza todas tus redes sociales, página o tienda en linea, menú, etc, en 1 solo link y GRATIS." />
        <meta property="og:title" content={`${process.env.NEXT_PUBLIC_APP_NAME} &bull; 1 enlace para todo`} />
        <meta property="og:description" content={`Crea y personaliza tu perfil personal o el de tu marca y enlaza todas tus redes sociales, página o tienda en linea, menú, etc, en 1 solo link y GRATIS.`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}`} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
      </Head>
      <Layout>
        <section className="hero pt-5 pb-5 bg-light">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-md-6 col-lg-5 mb-5 mb-md-0">
                <h1 className="display-1 display-lg-2 hero-title mb-5 text-center text-md-start">1 enlace <br /> para todo</h1>
  
                <p className="hero-intro m-0 mb-5 text-center text-md-start">Crea y personaliza tu perfil personal o el de tu marca y enlaza todas tus redes sociales, página o tienda en linea, menú, etc, en 1 solo link y <strong>GRATIS</strong>.</p>

                <Link href="/new/user">
                  <a className="btn btn-dark btn-lg d-block d-lg-inline-block me-lg-4 pt-3 pb-3 pt-lg-2 pb-lg-2">
                    <i className="icon icon-user me-2"></i>
                    <span>Crear mi perfil</span>
                  </a>
                </Link>

                <a href="tubio" className="btn btn-outline-secondary d-block d-lg-inline-block mt-3 mt-lg-0 pt-2 pb-2" target="_blank">
                  <i className="icon icon-tablet me-2"></i>
                  <span>Ver demo</span>
                </a>

                <p className="m-0 mt-4">
                  <small>
                    <span>Al crear un perfil usted acepta nuestros </span>
                    <Link href="/terms">
                      <a>
                        <strong>términos y condiciones</strong>
                      </a>
                    </Link>
                  </small>
                </p>
              </div>
              <div className="col-12 col-md-6 col-lg-5 text-center hero-col-img">
                <img src={phoneScreen.src} className="hero-col-img-phone" loading="lazy" />
                <img src={appScreen.src} className="hero-col-img-screen" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="why-tubio pt-5 pb-5">
          <div className="container">
            <h2 className="text-center mb-5">¿Por qué crear un perfil en TuBio?</h2>

            <div className="row align-items-stretch gap-xl-4 justify-content-center">
              <div className="col-12 col-md-4 col-xl-3 text-center">
                <div className="icon-box d-block mb-4 ms-auto me-auto">
                  <i className="icon icon-thumbs-o-up"></i>
                </div>
                <h5>Porque es ¡GRATIS!</h5>
                <p>TuBio siempre te dará 1 perfil gratis por cuenta (correo o Facebook). Sin restricciones y con mejoras constantes.</p>
              </div>
              <div className="col-12 col-md-4 mt-4 mt-md-0 col-xl-3 text-center">
                <div className="icon-box d-block mb-4 ms-auto me-auto">
                  <i className="icon icon-link"></i>
                </div>
                <h5>Porque es óptimo</h5>
                <p>Organiza todos los enlaces de redes sociales, WhatsApp, tienda en línea, menú, etc, en un único enlace. Hazlo fácil a tus seguidores y clientes.</p>
              </div>
              <div className="col-12 col-md-4 mt-4 mt-md-0 col-xl-3 text-center">
                <div className="icon-box d-block mb-4 ms-auto me-auto">
                  <i className="icon icon-lock"></i>
                </div>
                <h5>Porque es seguro</h5>
                <p>Nos hemos preocupado por la seguridad, así que hemos creado TuBio con tecnologias de ultima generación.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-5 pb-5 bg-light faqs">
          <div className="container">
            <h2 className="text-center mb-5">Preguntas frecuentes</h2>

            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <ul className="list-unstyled faqs-list">
                {faqs.map((faq, index) => (
                  <li className="faq" data-faq={index} key={`q${index}`}>
                    <button className={`faq-question${index === 0 ? ' open' : ''}`} onClick={() => showFaq(index)}>
                      <span>{faq.question}</span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default HomePage;