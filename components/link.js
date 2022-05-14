export default function LinkBtn({ data }) {
  return (
    <li
      className='biz-links-list-item mb-4'
      key={`k-${data.index}`}
    >
      <a
        style={{
          borderColor: data.color,
          color: data.color
        }}
        href={data.link}
        className='biz-links-link'
        target="_blank"
        rel='noopener'
      >
        <i className={`${data.icon} fa-2x me-4`}></i>
        <span>{ data.title }</span>
      </a>
    </li>
  )
}