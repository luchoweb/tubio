import Head from "next/head";
import Image from "next/image";
import { useForm } from 'react-hook-form';

import PublicFooter from "../../components/common/footer";

import Logo from "../../images/logo-web.png";

function NewBizPage() {
  const AppName = process.env.NEXT_PUBLIC_APP_NAME;

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
  };

  return (
    <>
      <Head>
        <title>Nuevo usuario &bull; {AppName}</title>
      </Head>
      <main className="form-new">
        <div className="container">
          <section className="pt-5 pb-5 text-center">
            <Image src={Logo} alt={AppName} height={59} width={117} />

            <div className="row justify-content-center">
              <div className="col-10 col-md-9 col-lg-6 col-xl-5">
                <form className="form-horizontal mt-5" onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="text-center">Nuevo usuario</h4>
                  <p className="text-center mb-5">Ingrese su correo electrónico y una contraseña para empezar.</p>
                  <div className="form-group mb-4 text-start">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      className={`form-control${errors?.email ? ' is-invalid' : ''}`}
                      {...register("email", {
                        required: true,
                        maxLength: 100,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      })}
                    />
                    {errors?.email && <span className="form-error">Verifique su e-mail</span>}
                  </div>

                  <div className="form-group mb-5 text-start">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      id="password"
                      className={`form-control${errors?.password ? ' is-invalid' : ''}`}
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 10
                      })}
                    />
                    {errors?.password && <span className="form-error">Su contraseña debe ser mínimo de 8 y máximo de 10 carácteres.</span>}
                  </div>

                  <button role="submit" className="btn btn-dark">
                    <span>Crear usuario</span>
                    <i className="fa fa-user-plus ms-2"></i>
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  )
}

export default NewBizPage;