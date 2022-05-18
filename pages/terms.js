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
      <Layout>
        <div className="container">
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
            <p>TuBio podrá modificar estos términos y condiciones sin previo aviso.</p>
            <p>TuBio usa licencias libres de programas (software) de código abierto para el funcionamiento de la aplicación y licencias gratuitas de otras plataformas como Google&reg; Fonts y Font Awesome de Fonticons, Inc.</p>
            <p className="text-muted m-0 mt-5">
              <small>Última revisión: 14 de mayo de 2022</small>
            </p>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default TermsPage;