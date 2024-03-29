export default function LinkBtn({ data }) {
  return (
    <li
      className='biz-links-list-item mb-4'
      key={`k-${data.index}`}
    >
      <a
        style={{
          backgroundColor: data.bgColor,
          borderColor: data.color,
          color: data.color
        }}
        href={data.link}
        className='biz-links-link'
        target="_blank"
        rel='noopener'
      >
        <i className={`icon icon-${data.icon} me-4`}></i>
        <span>{ data.title }</span>
      </a>
    </li>
  )
}