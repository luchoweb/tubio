import Head from "next/head";

function LoginPage() {
  return (
    <>
      <Head>
        <title>Iniciar sesión &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div>Iniciar sesión</div>
    </>
  )
}

export default LoginPage;