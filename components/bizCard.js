import Link from "next/link";

export default function BizCard({ biz }) {
  return (
    <div className="card h-100">
      <div className="card-header pt-3 pb-3"
        style={{
          backgroundColor: biz.background,
          color: biz.text_color
        }}
      >
        <h4 className="m-0 card-title">{biz.name}</h4>
      </div>
      <div className="card-body">
        <p className="card-text">
          {biz.city && (
            <>
              {biz.city}
              <br />
            </>
          )}
          {biz.country && biz.country}
        </p>

        <div className={`flag${biz.is_free === 0 ? ' flag-bg-warning text-dark' : ' flag-bg-dark'}`}>
          {biz.is_free === 0 ? 'Pago' : 'Gratis'}
        </div>
      </div>

      <div className="card-footer pt-3">
        <a href={`/${biz.username}`} className="btn btn-sm btn-outline-dark mb-2" target="_blank" title="Ver">
          <i className="icon icon-eye"></i>
        </a>

        <span className="me-1 ms-1"></span>

        <Link href={`/admin/profile/edit/${biz.id}`}>
          <a className="btn btn-sm btn-primary mb-2" title="Editar">
            <i className="icon icon-pencil"></i>
          </a>
        </Link>

        <span className="me-1 ms-1"></span>

        <Link href={`/admin/profile/delete/${biz.id}`}>
          <a className="btn btn-sm btn-danger mb-2" title="Eliminar">
            <i className="icon icon-trash"></i>
          </a>
        </Link>

        <span className="me-1 ms-1"></span>

        <Link href={`/admin/profile/stats/${biz.id}`}>
          <a className="btn btn-sm btn-warning mb-2" title="Estadísticas">
            <i className="icon icon-area-chart"></i>
          </a>
        </Link>
      </div>
    </div>
  )
}