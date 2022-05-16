import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useForm } from 'react-hook-form';

import { useAuth } from "../../firebase/authUserContext";
import { translateFirebaseErrors } from "../../helpers";
import PublicFooter from "../../components/common/footer";

import Logo from "../../images/logo-web.png";

function ResetPasswdPage() {
  const AppName = process.env.NEXT_PUBLIC_APP_NAME;
  const titlePage = 'Reestablecer contraseña';

  const { sendPasswordResetEmail } = useAuth();

  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setError(null);
    setEmailSent(false);

    sendPasswordResetEmail(data.email)
      .then(res => {
        console.log(res);
        setEmailSent(true);
      })
      .catch(error => {
        setError(
          translateFirebaseErrors(error)
        )
      });
  };

  return (
    <>
      <Head>
        <title>{titlePage} &bull; {AppName}</title>
      </Head>
      <main className="form-new">
        <div className="container">
          <section className="pt-5 pb-5 text-center">
            <Link href="/">
              <a>
                <Image src={Logo} alt={AppName} height={59} width={117} />
              </a>
            </Link>

            <div className="row justify-content-center">
              <div className="col-10 col-md-9 col-lg-6 col-xl-5">
                <form className="form-horizontal mt-5" onSubmit={handleSubmit(onSubmit)}>
                  <h4>{titlePage}</h4>
                  <p className="mb-5">Ingrese su correo electrónico, se le enviará un enlace para reestablecer la contraseña.</p>

                  { emailSent && (
                    <div className="alert alert-success mb-5">
                      <p className="m-0">
                        <span className="ms-2">Ha sido envio un enlace al correo ingresado.</span>
                        <Link href="/admin">
                          <a className="alert-link ms-2">Iniciar sesión</a>
                        </Link>
                      </p>
                    </div>
                  )}

                  { error && (
                    <div className="alert alert-danger mb-5">
                      <p className="m-0">
                        <span className="ms-2">{error.message}.</span>
                      </p>
                    </div>
                  )}

                  <div className="form-group mb-5 text-start">
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

                  <button role="submit" className="btn btn-dark">
                    <span>Enviar enlace</span>
                    <i className="fa fa-link ms-2"></i>
                  </button>

                  <div className="form-group mt-4">
                    <Link href="/admin">
                      <a>
                        <small className="text-muted">
                          <i className="fa fa-arrow-left me-2"></i>
                          <span>Volver</span>
                        </small>
                      </a>
                    </Link>
                  </div>
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

export default ResetPasswdPage;