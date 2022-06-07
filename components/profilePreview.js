import Logo from "../images/favicon.png";

function ProfilePreview({ data }) {
    const avatarPreview = data.avatar && typeof data.avatar === 'string' ? data.avatar : (data?.avatar?.length && URL.createObjectURL(data?.avatar[0]));

  return (
    <div className="preview-profile">
      <header className='w-100 biz-info pt-3 pb-3 text-center' style={{
        backgroundColor: data.background,
        color: data.text_color
      }}>
        <figure className='biz-info-avatar mb-4'
          style={{
            backgroundColor: data.text_color,
            border: `2px solid ${data.text_color}`
          }}
        >
          <img src={ avatarPreview || Logo.src } />
        </figure>
       
        <h1 className='biz-info-name mb-3'>
          {data.name || 'Nombre'}
        </h1>

        <div className="biz-info-location">
          {data.address ? (
            <p className="m-0 mb-2 biz-info-location-address">{data.address}</p>
          ) : ''}

          <p className={`m-0 biz-info-location-country`}>
            {data.city ? (
              <span>{data.city}</span>
            ): ''}
            {data.country ? (
              <span>
                {data.city ? `, ${data.country}` : data.country}
              </span>
            ): ''}
          </p>
        </div>
      </header>
      <section className="preview-profile-links pt-3 pb-3">
        <ul className="links-list list-unstyled">
          {data?.links?.length > 0 ? data.links.map((link, index) => (
            <li key={`l${index}`} className="links-list-link" style={{borderColor: link.color}}>
              <a href={link.link} rel="noopener" target="_blank" style={{color: link.color}}>
                <i className={`icon icon-${link.icon}`}></i>
                <span>{link.title}</span>
              </a>
            </li>
          )) : (
            <li><small>No hay enlaces para mostrar.</small></li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default ProfilePreview;