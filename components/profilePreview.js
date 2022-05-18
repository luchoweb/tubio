function ProfilePreview({ data }) {
    const avatarPreview = data.avatar && data.avatar.length && URL.createObjectURL(data?.avatar[0]);

  return (
    <div className="preview p-3">
      <header className='w-100 biz-info pt-4 pb-4 text-center' style={{
        backgroundColor: data.background
      }}>
        { avatarPreview ? (
          <figure className='biz-info-avatar mb-4'>
            <img src={avatarPreview} />
          </figure>
        ) : ''}
       
        <h1 className='biz-info-name' style={{color: data.text_color}}>
          {data.name}
        </h1>
      </header>
    </div>
  )
}

export default ProfilePreview;