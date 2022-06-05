import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { io } from 'socket.io-client';

import ProfilePreview from '../profilePreview';
import appScreen from "../../images/phone-screen-samsung.png";

import { getBiz } from '../../lib/api';
import { arrayIcons } from "../../helpers";

function FormBiz() {
  const { register, setError, setValue, clearErrors, handleSubmit, watch, formState: { errors } } = useForm();
  
  const [err, setErr] = useState(null);

  const [currentLinkIcon, setCurrentLinkIcon] = useState('link');
  const [currentLinkTitle, setCurrentLinkTitle] = useState(null);
  const [currentLink, setCurrentLink] = useState(null);
  const [currentLinkColor, setCurrentLinkColor] = useState('#000000');

  const [currentLinkTitleError, setCurrentLinkTitleError] = useState(null);
  const [currentLinkError, setCurrentLinkError] = useState(null);

  const [links, setLinks] = useState([]);

  const onSubmit = async ( data ) => {
    setErr(null);

    const biz = await getBiz(data.username);
  
    if ( !biz.message ) {
      setError('username');
      setErr("El nombre de usuario ya se encuentra registrado o está restringido, por favor intente con uno diferente.");
    } else {
      // Clear errors form
      clearErrors('username');

      // Avatar
      const body = new FormData();
      body.append("file", data.avatar[0]);
      body.append("username", data.username);
      const response = await fetch(`/api/upload`, {
        method: "POST",
        body
      });
  
      if ( response.status === 200 ) {
        const socket = io(process.env.NEXT_PUBLIC_API_URL, { transports : ['websocket'] });
        // Restart tubio next app
        socket.emit('upload');
      } else {
        setErr("Ha ocurrido un error creando su perfil, por favor haga clic nuevamente en Crear perfil.");
      }

      // Prints output
      console.log(data);
    }
  }

  const handleAddLink = (e) => {
    e.preventDefault();

    setCurrentLinkTitleError(currentLinkTitle);
    setCurrentLinkError(currentLink);

    if ( currentLinkTitle && currentLink && (currentLink?.indexOf('http://') > -1 || currentLink?.indexOf('https://') > -1 || currentLink?.indexOf('mailto:') > -1 || currentLink?.indexOf('tel:') > -1) ) {
  
      const validateLinks = links.filter(link => link.link === currentLink);

      if ( validateLinks.length ) {
        setCurrentLinkError({message: 'Ya tiene un enlace con este destino.'});
      } else {
        setLinks([
          ...links,
          {
            icon: currentLinkIcon,
            title: currentLinkTitle,
            link: currentLink,
            color: currentLinkColor
          }
        ]);
  
        setCurrentLinkTitle(null);
        setCurrentLink(null);
        setCurrentLinkIcon('link');
        setCurrentLinkColor('#000000');

        const inputs = document.querySelectorAll('.link-value');
        inputs.forEach(input => input.value = "");
      }
    }
  }

  const handleRemoveLink = (e, linkHref) => {
    e.preventDefault();
    
    links.map((link, index) => {
      if ( link.link === linkHref ) {
        links.splice(index, 1);
      }
    });
    
    setLinks([...links]);
  }

  const handleShowIcons = (e) => {
    e.preventDefault();

    const listIcons = document.querySelector(".list-icons");

    if ( listIcons.classList.contains('hide') ) {
      listIcons.classList.remove('hide');
    } else {
      listIcons.classList.add('hide');
    }
  }

  return (
    <form className="form-biz form-horizontal preview-form mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className='row min-vh-100 mb-4'>
        <div className='col-12 col-md-7 col-lg-8'>
          <div className="form-group mb-4">
            <label htmlFor="avatar">Avatar / Logo</label>
            <input
              className={`mt-2 form-control${errors?.avatar ? ' is-invalid' : ''}`}
              type="file"
              {...register("avatar", {
                required: true && 'Se requiere su logo o foto',
                maxLength: 100,
                validate: {
                  lessThan10MB: (files) => files[0]?.size < 5000000 || "Max 5 MB",
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
              <span>Usuario:</span>
              <span className='text-muted ms-2'>
                tubio.co/<strong>{watch('username')}</strong>
              </span>
            </label>
            <input
              id="username"
              className={`mt-1 form-control${errors?.username ? ' is-invalid' : ''}`}
              {...register("username", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z0-9]+$/i
              })}
            />
            {errors?.username && <span className="form-error">Verifique el usuario o intente con uno diferente</span>}
          </div>
    
          <div className="form-group mb-4">
            <label htmlFor="name">Nombre o razón social</label>
            <input
              id="name"
              className={`mt-1 form-control${errors?.name ? ' is-invalid' : ''}`}
              {...register("name", {
                required: true,
                maxLength: 150,
                pattern: /^[A-Za-z0-9 .-ñÑ]+$/i
              })}
            />
            {errors?.name && <span className="form-error">Verifique el nombre</span>}
          </div>

          <div className="form-group mb-4 text-start">
            <label htmlFor="address">Dirección o eslogan</label>
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
                maxLength: 100,
                pattern: /^[A-Za-z]+$/i
              })}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="country">País</label>
            <input
              id="country"
              className={`mt-1 form-control${errors?.country ? ' is-invalid' : ''}`}
              {...register("country", {
                required: false,
                maxLength: 100,
                pattern: /^[A-Za-z]+$/i
              })}
            />
            {errors?.country && <span className="form-error">Verifique el país</span>}
          </div>

          <div className='row'>
            <div className='col-6 col-lg-3'>
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
            
            <div className='col-6 col-lg-3'>
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

          <div className='form-group preview-form-links mt-5 mb-5'>
            <h4 className='mb-3'>Enlaces agregados</h4>

            {links.length ? (
              <div className='table-responsive'>
                <table className='table table-striped table-hover'>
                  <thead>
                    <tr>
                      <th scope="col">Icono</th>
                      <th scope="col">Titulo</th>
                      <th scope="col">Enlace</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  { links.map((link, index) => (
                    <tr key={`l${index}`}>
                      <th scope="row">
                        <i className={`main-icon icon icon-${link.icon}`}></i>
                      </th>
                      <td>
                        <p className='m-0'>{link.title}</p>
                      </td>
                      <td>
                        <p className='m-0'>{link.link}</p>
                      </td>
                      <td className='text-end pe-3'>
                        <a href="#" onClick={(e) => handleRemoveLink(e, link.link)}>
                          <i className='icon icon-trash text-danger'></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='alert alert-info pt-2 pb-2'>
                <p className='m-0'>
                  <small>
                    No hay enlaces agregados, por favor agregue su primer enlace.
                  </small>
                </p>
              </div>
            )}

            <div className='row add-links mb-4 mt-5'>
              <h4 className='mb-4'>Agregar enlace</h4>
              <div className='col-12 mb-4'>
                <label className='d-block mb-2'>Seleccione un icono</label>
                <a href="#" onClick={(e) => handleShowIcons(e)} className="link-icon">
                  <i className={`icon icon-${currentLinkIcon}`}></i>
                </a>

                <ul className='list-unstyled d-flex flex-wrap gap-3 mt-2 justify-content-between list-icons hide'>
                {arrayIcons.map((icon, index) => (
                  <li key={`l${index}`} className="preview-form-link-icon" onClick={(e) => handleShowIcons(e)}>
                    <i className={`icon icon-${icon}`} onClick={() => setCurrentLinkIcon(icon)}></i>
                  </li>
                ))}
                </ul>
              </div>

              <div className='col-6'>
                <label htmlFor="link_title">Titulo del enlace</label>
                <input className={`link-value mt-1 form-control${!currentLinkTitleError ? ' is-invalid' : ''}`} id="link_title" placeholder='Sígueme en Instagram' onBlur={(event) => setCurrentLinkTitle(event.target.value)} />
                {!currentLinkTitleError && <span className="form-error">Debe ingresar un titulo</span>}
              </div>

              <div className='col-6 mb-4'>
                <label htmlFor="link">Titulo del enlace</label>
                <input className={`link-value mt-1 form-control${!currentLinkError || currentLinkError?.message ? ' is-invalid' : ''}`} id="link" placeholder='http, https, mailto, tel' onBlur={(event) => setCurrentLink(event.target.value)} />
                {!currentLinkError && <span className="form-error">Debe ingresar un enlace</span>}
                {currentLinkError?.message && <span className="form-error">
                  { currentLinkError?.message }
                </span>}
              </div>

              <div className='col-12'>
                <label htmlFor="linkColor">Seleccione un color</label>
                <input
                  id="linkColor"
                  className={`mt-1 form-control form-control-color`}
                  type="color"
                  value={currentLinkColor}
                  onChange={(e) => setCurrentLinkColor(e.target.value)}
                />
              </div>
            </div>

            <a href="#" className='btn btn-dark' onClick={(e) => handleAddLink(e)}>
              <span>Agregar enlace</span>
              <i className='icon icon-link ms-2'></i>
            </a>
          </div>
        </div>

        <div className='col-12 col-md-5 col-lg-4 mb-4 mb-lg-0'>
          <div className='preview sticky-md-top text-center pt-3'>
            <div className='preview-form-phone'>
              <img src={appScreen.src} className="hero-col-img-screen" loading="lazy" height={500} />
              <ProfilePreview data={{
                  background: watch('background'),
                  text_color: watch('text_color'),
                  name: watch('name'),
                  avatar: watch('avatar'),
                  address: watch('address'),
                  city: watch('city'),
                  country: watch('country'),
                  links
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {err && (
        <div className='alert alert-danger mt-5 mb-5 pt-2 pb-2'>
          <p className='m-0'>
            <small>
              <i className='icon icon-info-circle me-2'></i>
              {err}
            </small>
          </p>
        </div>
      )}

      <div className='form-group mt-5 text-center text-md-start'>
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
    </form>
  )
}

export default FormBiz;
