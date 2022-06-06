import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';

import firebase from "../../firebase/firebase";
import { useAuth } from '../../firebase/authUserContext';

import PublicFooter from "../../components/common/footer";

import Logo from "../../images/logo-web.png";
import { translateFirebaseErrors } from "../../helpers";

function LoginPage() {
  const router = useRouter();
  const AppName = process.env.NEXT_PUBLIC_APP_NAME;

  const [error, setError] = useState(null);
  const [loginLoad, setLoginLoad] = useState(false);

  const { signInWithEmailAndPassword, signInWithRedirect } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setError(null)
    signInWithEmailAndPassword(data.email, data.password)
    .then(formatAuthUser => {
      localStorage.setItem("userData", JSON.stringify(
        {
          email: formatAuthUser.user.email,
          uid: formatAuthUser.user.uid
        }
      ));
      router.push('/admin/dashboard');
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
          
          const userFormatted = {
            uid: user.uid,
            email: user.email
          }
          
          if( user ) {
            localStorage.setItem("userData", JSON.stringify(userFormatted));
            router.push('/admin/dashboard');
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
        <title>Iniciar sesión &bull; {AppName}</title>
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
              <div className="row justify-content-center">
                <div className="col-10 col-md-9 col-lg-6 col-xl-5">
                  <form className="form-horizontal mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <h4>Iniciar sersión</h4>

                    <p className="mb-5">Ingrese su correo electrónico y contraseña para acceder.</p>

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
                      {errors?.password && <span className="form-error">Verifique su contraseña</span>}
                    </div>

                    <button role="submit" className="btn btn-dark">
                      <span>Ingresar</span>
                      <i className="icon icon-sign-in ms-2"></i>
                    </button>

                    <div className="form-group mt-4">
                      <Link href="/admin/reset-password">
                        <a>
                          <small className="text-muted">
                            <i className="icon icon-lock me-2"></i>
                            <span>Reestablecer contraseña</span>
                          </small>
                        </a>
                      </Link>
                    </div>

                    <div className="form-group mt-5">
                      <span href="#" className="btn btn-sm btn-primary" onClick={() => signInWithRedirect()}>
                        <i className="icon icon-facebook me-2"></i>
                        <span>Ingresar con Facebook</span>
                      </span>
                    </div>

                    <div className="form-group mt-3">
                      <Link href="/new/user">
                        <a>
                          <small className="text-muted">
                            <i className="icon icon-user-plus me-2"></i>
                            <span>Registrarme</span>
                          </small>
                        </a>
                      </Link>
                    </div>
                  </form>
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

export default LoginPage;