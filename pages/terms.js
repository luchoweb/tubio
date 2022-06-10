import Head from "next/head";

import Layout from "../components/layouts/layout";

function TermsPage() {
  return (
    <>
      <Head>
        <title>Términos y condiciones &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Aquí consulta nuestros términos y condiciones." />
        <meta property="og:title" content={`Términos y condiciones &bull; ${process.env.NEXT_PUBLIC_APP_NAME}`} />
        <meta property="og:description" content={`Aquí consulta nuestros términos y condiciones.`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/terms`} />
        <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_APP_NAME}`} />
      </Head>
      <Layout className="terms">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <section className="pt-5 pb-5">
                <h1 className="mb-5">Términos y condiciones</h1>
                <p>TuBio es una plataforma gratuita en línea que permite a cualquier persona (en adelante Usuario) crear un perfil para uso personal o comercial. Teniendo lo anterior en cuenta, TuBio en la buena fe, entiende que cada Usuario es dueño o tiene los permisos suficientes para el uso de la información con la cual cree su perfil en esta plataforma (logo, nombre y enlaces).</p>
                <p>TuBio habilita el correo electrónico tubio.link@gmail.com para recibir los reclamos provenientes por creación de perfiles usando información sin los permisos correspondientes, nos tomamos en serio el Copyright y la buena imagen de las personas y empresas.</p>
                <p>TuBio pensando en la seguridad de usuarios, marcas y personas, verificará el mayor número de perfiles populares posibles, con ello se evita que personas inescrupulosas engañen por medio de perfiles falsos.</p>
                <div>
                  <p>TuBio no usará, comercializará o difundirá la siguente información agregada por el usuario al momento de crear su perfil en la plataforma:</p>
                  <ul className="mt-3 mb-4">
                    <li>Logotipos</li>
                    <li>Imágenes</li>
                    <li>Nombres (usuario o marca)</li>
                    <li>Direcciones</li>
                    <li>Números telefónicos</li>
                  </ul>
                </div>
                <p>TuBio no usa cookies por el momento, ni para publicidad ni para mejorar la experiencia de uso.</p>
                <p>TuBio usa licencias libres de programas (software) de código abierto para el funcionamiento de la aplicación y licencias gratuitas de otras plataformas como Google&reg; Fonts y Font Awesome de Fonticons, Inc.</p>
                <p>TuBio ofrece 1 perfil totalmente gratis, si desea adicionar un perfil a la misma cuenta, se deberá pagar solo 4.99 dólares por año o crear otra cuenta con otro e-mail o perfil de Facebook&reg;.</p>
                <p>Los pagos hechos por perfiles adicionales se hacen a través de la plataforma ePayco&reg;, empresa legalmente constituida en Colombia que cuenta con toda la seguridad en sus servidores para ofrecer pagos en línea seguros. TuBio no almacena ni almacenará su información bancaria o de medios de pago, al momento de pagar, siempre será dirigido al checkout de ePayco&reg;.</p>
                <p>TuBio podrá modificar estos términos y condiciones sin previo aviso.</p>
                <p className="text-muted m-0 mt-5">
                  <small><strong>Última revisión</strong>: 10 de junio de 2022</small>
                </p>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default TermsPage;