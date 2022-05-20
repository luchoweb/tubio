import Logo from "../images/favicon.png";

function ProfilePreview({ data }) {
    const avatarPreview = data.avatar && data.avatar.length && URL.createObjectURL(data?.avatar[0]);

  return (
    <div className="preview-profile">
      <header className='w-100 biz-info pt-4 pb-4 text-center' style={{
        backgroundColor: data.background
      }}>
        <figure className='biz-info-avatar mb-4'
          style={{
            backgroundColor: data.text_color,
            border: `3px solid ${data.text_color}`
          }}
        >
          <img src={avatarPreview || Logo.src } />
        </figure>
       
        <h1 className='biz-info-name' style={{color: data.text_color}}>
          {data.name || 'Nombre'}
        </h1>
      </header>
    </div>
  )
}

export default ProfilePreview;