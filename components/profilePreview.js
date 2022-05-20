import Logo from "../images/favicon.png";

function ProfilePreview({ data }) {
    const avatarPreview = data.avatar && data.avatar.length && URL.createObjectURL(data?.avatar[0]);

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
          <img src={avatarPreview || Logo.src } />
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
    </div>
  )
}

export default ProfilePreview;