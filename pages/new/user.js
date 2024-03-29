import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { useForm } from 'react-hook-form';

import { translateFirebaseErrors } from "../../helpers";
import { useAuth } from "../../firebase/authUserContext";
import firebase from "../../firebase/firebase";

import PublicFooter from "../../components/common/footer";
import Logo from "../../images/logo-web.png";

function NewBizPage() {
  const AppName = process.env.NEXT_PUBLIC_APP_NAME;
  const pageTitle = 'Nuevo usuario';

  const [error, setError] = useState(null);
  const [loginLoad, setLoginLoad] = useState(false);
  const [loginEmail, setLoginEmail] = useState(false);

  const { createUserWithEmailAndPassword, signInWithRedirect } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setError(null);

    createUserWithEmailAndPassword(data.email, data.password)
      .then(formatAuthUser => {
        Router.push("/admin");
      })
      .catch(error => {
        setError(
          translateFirebaseErrors(error)
        )
      });
  };

  useEffect(() => {
    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          const user = result.user;
          
          if( user ) {
            Router.push('/admin/dashboard');
          }
        } else {
          setLoginLoad(true);
        }
      })
      .catch((error) => {
        setLoginLoad(true);
        setError(
          translateFirebaseErrors(error)
        )
      });
  }, [loginLoad]);

  return (
    <>
      <Head>
        <title>{pageTitle} &bull; {AppName}</title>
      </Head>
      <main className="form-new">
        <div className="container">
          <section className="pt-5 pb-5 text-center">
            <Link href="/">
              <a>
                <img src={Logo.src} alt={AppName} height={59} width={117} />
              </a>
            </Link>

            { loginLoad ? (
              <div className="mt-5">
                {!loginEmail && (
                  <span className="btn btn-lg btn-outline-dark btn-login" onClick={() => setLoginEmail(!loginEmail)}>
                    <i className="icon icon-envelope me-2"></i>
                    <span>Registro con e-mail</span>
                  </span>
                )}

                {loginEmail && (
                  <div className="row justify-content-center mb-5">
                    <div className="col-10 col-md-9 col-lg-6 col-xl-5">
                      <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                        <h4 className="text-center">{pageTitle}</h4>
                        <p className="text-center mb-4">Ingrese un correo electrónico y una contraseña para empezar.</p>
    
                        { error && (
                          <div className="alert alert-danger mb-5">
                            <p className="m-0">
                              <span className="ms-2">{error.message}.</span>
                            </p>
                          </div>
                        )}
    
                        <div className="form-group mb-4 text-start">
                          <label htmlFor="email">Correo electrónico</label>
                          <input
                            id="email"
                            type="email"
                            className={`form-control${errors?.email ? ' is-invalid' : ''}`}
                            {...register("email", {
                              required: true,
                              maxLength: 100,
                              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                          />
                          {errors?.email && <span className="form-error">Verifique su e-mail</span>}
                        </div>
    
                        <div className="form-group mb-4 text-start">
                          <label htmlFor="password">Contraseña</label>
                          <input
                            id="password"
                            type="password"
                            className={`form-control${errors?.password ? ' is-invalid' : ''}`}
                            {...register("password", {
                              required: true,
                              minLength: 6,
                              maxLength: 10
                            })}
                          />
                          {errors?.password && <span className="form-error">Su contraseña debe ser mínimo de 6 y máximo de 10 carácteres.</span>}
                        </div>
    
                        <div className="form-group text-start">
                          <label htmlFor="password-repeat">Repetir contraseña</label>
                          <input
                            id="password-repeat"
                            type="password"
                            className={`form-control${errors?.password_repeat ? ' is-invalid' : ''}`}
                            {...register("password_repeat", {
                              validate: value => 
                                value === password.value || "Su contraseña debe conincidir"
                            })}
                          />
                          {errors?.password_repeat && <span className="form-error">{errors?.password_repeat?.message}</span>}
                        </div>
    
                        <button role="submit" className="btn btn-dark mt-4">
                          <span>Crear usuario</span>
                          <i className="icon icon-user-plus ms-2"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <span className="btn btn-lg btn-primary btn-login" onClick={() => signInWithRedirect()}>
                    <i className="icon icon-facebook me-2"></i>
                    <span>Registro con Facebook</span>
                  </span>
                </div>

                <div className="mt-5">
                  <Link href="/admin">
                    <a className="text-muted">
                      <i className="ficon icon-sign-in me-2"></i>
                      <span>Iniciar sesión</span>
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="m-0 mt-5">Cargando...</p>
            )}
          </section>
        </div>
      </main>
      <PublicFooter />
    </>
  )
}

export default NewBizPage;