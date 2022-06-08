import Link from "next/link";

export default function AddProfileBtn({ info }) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <Link href={info.href}>
          <a className="d-flex flex-column align-items-center justify-content-center h-100">
            <i className={`icon icon-${info.icon} text-muted`}></i>
            <p className="m-0 mt-2 text-center text-muted">
              <span className="d-block">{info.text}</span>
              { info.price ? (
                <span>USD {info.price} / anuales</span>
              ) : ''}
            </p>
          </a>
        </Link>
      </div>
    </div>
  )
}