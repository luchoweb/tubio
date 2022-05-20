import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import ProfilePreview from '../profilePreview';
import appScreen from "../../images/phone-screen-samsung.png";

function FormBiz() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const [error, setError] = useState(null);

  const onSubmit = async ( data ) => {
    setError(null);

    console.log(data);

    const body = new FormData();
    body.append("file", data.avatar[0]);
    body.append("username", data.username);
    const response = await fetch(`/api/upload`, {
      method: "POST",
      body
    });

    if ( response.status === 200 ) {
      // Crear perfil
    } else {
      setError("Ha ocurrido un error creando su perfil, por favor haga clic nuevamente en Crear perfil.");
    }
  }

  const handleAddLink = (event) => {
    event.preventDefault();
    console.log('add link');
  }

  return (
    <form className="form-horizontal preview-form mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className='row min-vh-100 mb-4'>
        <div className='col-12 col-md-6'>
          <div className="form-group mb-4">
            <label htmlFor="name">Nombre o razón social</label>
            <input
              id="name"
              className={`mt-1 form-control${errors?.name ? ' is-invalid' : ''}`}
              {...register("name", {
                required: true,
                maxLength: 150,
              })}
            />
            {errors?.name && <span className="form-error">Verifique el nombre</span>}
          </div>

          <div className="form-group mb-4 text-start">
            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              className={`mt-1 form-control`}
              {...register("address", {
                required: false,
                maxLength: 150,
              })}
            />
          </div>

          <div className="form-group mb-4 text-start">
            <label htmlFor="city">Ciudad</label>
            <input
              id="city"
              className={`mt-1 form-control`}
              {...register("city", {
                required: false,
                maxLength: 150,
              })}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="country">País</label>
            <input
              id="ncountryme"
              className={`mt-1 form-control${errors?.country ? ' is-invalid' : ''}`}
              {...register("country", {
                required: true,
                maxLength: 50,
              })}
            />
            {errors?.country && <span className="form-error">Verifique el país</span>}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="avatar">Avatar / Logo</label>
            <input
              className={`mt-1 form-control${errors?.email ? ' is-invalid' : ''}`}
              type="file"
              {...register("avatar", {
                required: true && 'Se requiere su logo o foto',
                maxLength: 100,
                validate: {
                  lessThan10MB: (files) => files[0]?.size < 10000000 || "Max 10MB",
                  acceptedFormats: (files) =>
                    ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(files[0]?.type) ||
                    "Solo imagenes PNG, JPG, WEBP o JPEG",
                }
              })}
            />
            {errors?.avatar && <span className="form-error">{ errors.avatar.message }</span>}
          </div>

          <div className="form-group mb-4 text-start">
            <label htmlFor="username">
              <span>Nombre de usuario:</span>
              <span className='text-muted ms-2'>tubio.co/{watch('username')}</span>
            </label>
            <input
              id="username"
              className={`mt-1 form-control${errors?.username ? ' is-invalid' : ''}`}
              {...register("username", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors?.username && <span className="form-error">Verifique el usuario o intente con otro</span>}
          </div>

          <div className="form-group mb-4 text-start">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              className={`mt-1 form-control${errors?.email ? ' is-invalid' : ''}`}
              {...register("email", {
                required: true,
                maxLength: 100,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
            />
            {errors?.email && <span className="form-error">Verifique su e-mail</span>}
          </div>

          <div className='row'>
            <div className='col-6 col-lg-4'>
              <div className="form-group mb-4 text-start">
                <label htmlFor="background">Color de fondo</label>
                <input
                  id="background"
                  className={`mt-1 form-control form-control-color d-block`}
                  type="color"
                  defaultValue="#000000"
                  {...register("background", {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </div>
            </div>
            <div className='col-6 col-lg-4'>
              <div className="form-group mb-4 text-start">
                <label htmlFor="text_color">Color del texto</label>
                <input
                  id="text_color"
                  className={`mt-1 d-block form-control form-control-color`}
                  type="color"
                  defaultValue="#FFFFFF"
                  {...register("text_color", {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </div>
            </div>
          </div>

          <div className='form-group mt-5 mb-5'>
            <h4 className='mb-3'>Enlaces</h4>

            <a href="#" className='btn btn-dark' onClick={(event) => handleAddLink(event)}>
              <span>Agregar enlace</span>
              <i className='icon icon-link ms-2'></i>
            </a>
          </div>
        </div>

        <div className='col-12 col-md-6 mb-4 mb-md-2'>
          <div className='preview sticky-md-top text-center pt-3'>
            <h4 className='m-0 mb-4'>
              <i className='icon icon-tablet me-3'></i>
              <span>Vista previa</span>
            </h4>

            <div className='preview-form-phone'>
              <img src={appScreen.src} className="hero-col-img-screen" loading="lazy" height={500} />
              
              <ProfilePreview data={{
                  background: watch('background'),
                  text_color: watch('text_color'),
                  name: watch('name'),
                  avatar: watch('avatar')
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className='form-group mt-5 text-center text-lg-start'>
        <button className='btn btn-dark me-4'>
          <span>Crear perfil</span>
          <i className='icon icon-user-plus ms-2'></i>
        </button>

        <Link href="/admin/dashboard">
          <a className='btn btn-outline-dark'>
            <i className='icon icon-chevron-left me-2'></i>
            <span>Volver</span>
          </a>
        </Link>
      </div>

      {error && (
        <div className='alert alert-danger mb-5'>
          <p className='m-0'>
            <i className='icon icon-info-circle me-2'></i>
            {error}
          </p>
        </div>
      )}
    </form>
  )
}

export default FormBiz;
