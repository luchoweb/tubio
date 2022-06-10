import Link from "next/link";
import Logo from "../../images/logo-web.png";

export default function PublicHeader() {
  return (
    <header className="pt-3 pb-3">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-6 col-lg-5">
            <Link href="/">
              <a><img src={Logo.src} alt={process.env.NEXT_PUBLIC_APP_NAME} height={59} width={117} /></a>
            </Link>
          </div>
          <div className="col-6 col-lg-5 d-flex justify-content-end">
            <nav className="navigation">
              <ul className="list-unstyled m-0 p-0 d-flex align-items-center">
                <li className="me-4">
                  <Link href="/admin">
                    <a className="d-flex align-items-center">
                      <span>Ingresar</span>
                      <i className="icon icon-sign-in ms-2"></i>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}