import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/authUserContext';

import ProfilePreview from '../profilePreview';
import appScreen from "../../images/phone-screen-samsung.png";

import { getBiz, saveBiz, updateBiz } from '../../lib/api';
import { arrayIcons } from "../../helpers";

function FormBiz({ action, isPaid = false, bizData = {} }) {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const { register, setError, clearErrors, handleSubmit, watch, formState: { errors } } = useForm();

  const [ hasPermission, setHasPermission ] = useState(false);
  
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentUser, setCurrentuser] = useState(null);

  const [currentLinkIcon, setCurrentLinkIcon] = useState('link');
  const [currentLinkTitle, setCurrentLinkTitle] = useState(null);
  const [currentLink, setCurrentLink] = useState(null);
  const [currentLinkColor, setCurrentLinkColor] = useState('#000000');
  const [currentLinkBgColor, setCurrentLinkBgColor] = useState('#F8F9FA');

  const [currentLinkTitleError, setCurrentLinkTitleError] = useState(true);
  const [currentLinkError, setCurrentLinkError] = useState(true);

  const [links, setLinks] = useState(bizData?.links || []);

  const onSubmit = async ( data ) => {
    setErr(null);
    setSuccess(null);

    const biz = await getBiz(data.username);
  
    if ( (!biz.message && action === 'save') || (!biz.message && biz.id !== bizData?.id) ) {
      setError('username');
      setErr("El nombre de usuario ya se encuentra registrado o está restringido, por favor intente con uno diferente.");
    } else {
      // Clear errors form
      clearErrors('username');

      // Save the avatar
      if ( data.avatar?.length ) {
        const body = new FormData();
        body.append("file", data.avatar[0]);
        body.append("username", data.username);
        const response = await fetch(`/api/upload`, {
          method: "POST",
          body
        });

        if ( response.status === 200 ) {
          //const socket = io(process.env.NEXT_PUBLIC_API_URL, { transports : ['websocket'] });
          // Restart tubio next app
          //socket.emit('upload');
        } else {
          setErr("Ha ocurrido un error creando su perfil, por favor haga clic nuevamente en Crear perfil.");
        }
      }

      data.links = links;
      data.user_uid = currentUser.uid;
      data.verified = bizData?.verified || 0;
      data.is_free = isPaid ? 0 : 1;

      if ( action === 'update' ) {
        data.id = bizData?.id;
        data.is_free = bizData?.is_free;
      }

      // Prints output
      const formAction = action === 'save' ? await saveBiz(data) : await updateBiz(data);

      if ( formAction?.code === 200 ) {
        // Everything okay? Go to dashboard!
        if ( action === 'save' )
          router.push('/admin/dashboard');

        setSuccess('Los cambios han sido guardados satisfactoriamente.');
        
      } else {
        // Show error!
        setErr(formAction.message);
      }
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
            bgColor: currentLinkBgColor,
            color: currentLinkColor
          }
        ]);
  
        setCurrentLinkTitle(null);
        setCurrentLink(null);
        setCurrentLinkIcon('link');
        setCurrentLinkColor('#000000');
        setCurrentLinkBgColor('#F8F9FA');

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

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/admin');
    } else {
      setCurrentuser(authUser);

      if ( authUser.uid !== bizData?.user_uid && action === 'update' ) {
        router.push('/admin/dashboard');
      } else {
        setHasPermission(true);
      }
    }
  }, [authUser, loading, hasPermission]);

  return (
    <form
      className={`${hasPermission ? 'd-block' : 'd-none'} form-biz form-horizontal preview-form mt-4`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='row min-vh-100 mb-4'>
        <div className='col-12 col-md-7 col-lg-8'>
          <div className='alert alert-light'>
            <div className="form-group mb-4">
              <label htmlFor="avatar">Avatar / Logo</label>
              <input
                className={`mt-2 form-control${errors?.avatar ? ' is-invalid' : ''}`}
                type="file"
                {...register("avatar", {
                  required: action !== 'save' ? false : (true && 'Se requiere su logo o foto'),
                  maxLength: 100,
                  validate: action === 'save' && {
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
                defaultValue={bizData?.username || ''}
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
                defaultValue={bizData?.name || ''}
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
                defaultValue={bizData?.address || ''}
                placeholder="Opcional"
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
                defaultValue={bizData?.city || ''}
                placeholder="Opcional"
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="country">País</label>
              <input
                id="country"
                className={`mt-1 form-control${errors?.country ? ' is-invalid' : ''}`}
                {...register("country", {
                  required: true,
                  maxLength: 100,
                  pattern: /^[A-Za-z]+$/i
                })}
                defaultValue={bizData?.country || ''}
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
                    defaultValue={bizData?.background || '#000000'}
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
                    defaultValue={bizData?.text_color || '#FFFFFF'}
                    {...register("text_color", {
                      required: true,
                      maxLength: 10,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='form-group preview-form-links mt-5 mb-5'>
            <h4 className='mb-3'>Enlaces agregados</h4>

            {links.length ? (
              <div className='alert alert-light'>
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
              </div>
            ) : (
              <div className='alert alert-secondary pt-2 pb-2'>
                <p className='m-0'>
                  <small>
                    No hay enlaces agregados, por favor agregue su primer enlace.
                  </small>
                </p>
              </div>
            )}

            {links.length < 10 ? (
              <div className='alert alert-light mt-4 add-links-box'>
                <div className='row add-links mb-4'>
                  <div className='col-6'>
                    <label htmlFor="link_title">Titulo del enlace</label>
                    <input className={`link-value mt-1 form-control${!currentLinkTitleError ? ' is-invalid' : ''}`} id="link_title" placeholder='Sígueme en Instagram' onBlur={(event) => setCurrentLinkTitle(event.target.value)} />
                    {!currentLinkTitleError && <span className="form-error">Debe ingresar un titulo</span>}
                  </div>

                  <div className='col-6 mb-4'>
                    <label htmlFor="link">Destino del enlace</label>
                    <input
                      className={`link-value mt-1 form-control${!currentLinkError || currentLinkError?.message ? ' is-invalid' : ''}`}
                      id="link"
                      type="url"
                      placeholder='http, https, mailto, tel'
                      onBlur={(event) => setCurrentLink(event.target.value)}
                    />
                    {!currentLinkError && <span className="form-error">Debe ingresar un enlace</span>}
                    {currentLinkError?.message && <span className="form-error">
                      { currentLinkError?.message }
                    </span>}
                  </div>

                  <div className='col-6 mb-2'>
                    <label className='d-block mb-2'>Seleccione un icono</label>
                    <a href="#" onClick={(e) => handleShowIcons(e)} className="link-icon">
                      <i className={`icon icon-${currentLinkIcon}`}></i>
                    </a>

                    <ul className='t-1 pb-1 ps-3 pe-3 list-unstyled d-flex flex-wrap gap-4 mt-2 justify-content-between list-icons hide'>
                    {arrayIcons.map((icon, index) => (
                      <li key={`l${index}`} className="preview-form-link-icon" onClick={(e) => handleShowIcons(e)}>
                        <i className={`icon icon-${icon}`} onClick={() => setCurrentLinkIcon(icon)}></i>
                      </li>
                    ))}
                    </ul>
                  </div>

                  <div className='col-3'>
                    <label htmlFor="linkBgColor">Fondo</label>
                    <input
                      id="linkBgColor"
                      className={`mt-1 form-control form-control-color`}
                      type="color"
                      value={currentLinkBgColor}
                      onChange={(e) => setCurrentLinkBgColor(e.target.value)}
                    />
                  </div>

                  <div className='col-3'>
                    <label htmlFor="linkColor">Color</label>
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
                  <i className='icon icon-link me-2'></i>
                  <span>Agregar enlace</span>
                </a>
              </div>
            ) : (
              <div className='alert alert-secondary pt-2 pb-2'>
                <p className='m-0'>
                  <small>
                    Has alcanzado el lìmite de enlaces permitidos.
                  </small>
                </p>
              </div>
            )}
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
                  avatar: action === 'save' ? watch('avatar') : (watch('avatar')?.length ? watch('avatar') : `/uploads/${bizData?.username}/avatar.webp`),
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
        <div className='alert alert-danger mt-4 mb-5 pt-2 pb-2'>
          <p className='m-0'>
            <small>
              <i className='icon icon-info-circle me-2'></i>
              {err}
            </small>
          </p>
        </div>
      )}

      {success && (
        <div className='alert alert-success mt-4 mb-5 pt-2 pb-2'>
          <p className='m-0'>
            <small>
              <i className='icon icon-info-circle me-2'></i>
              {success}
              <a href={`/${watch('username')}`} className="ms-2 alert-link" target="_blank" rel="noopener" title="Ver">
                Ver perfil
              </a>
            </small>
          </p>
        </div>
      )}

      <div className='form-group mt-5 text-center text-md-start'>
        <button className='btn btn-dark me-4'>
          <span>{action === 'save' ? 'Crear nuevo' : 'Actualizar'} perfil</span>
          <i className={`icon icon-${action === 'save' ? 'user-plus' : 'pencil'} ms-2`}></i>
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
