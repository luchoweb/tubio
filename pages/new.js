import Head from "next/head";

function NewBizPage() {
  return (
    <>
      <Head>
        <title>Nuevo perfil &bull; {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div>Registro</div>
    </>
  )
}

export default NewBizPage;