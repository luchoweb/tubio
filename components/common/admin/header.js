import Link from "next/link";

import { useAuth } from "../../../firebase/authUserContext";

import Logo from "../../../images/logo-web.png";

export default function PrivateHeader() {
  const { signOut } = useAuth();

  return (
    <header className="pt-3 pb-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <Link href="/admin/dashboard">
              <a><img src={Logo.src} alt={process.env.NEXT_PUBLIC_APP_NAME} height={59} width={117} /></a>
            </Link>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <nav className="navigation">
              <ul className="list-unstyled m-0 p-0 d-flex align-items-center">
                <li className="me-4">
                  <a href="#" className="d-flex align-items-center" onClick={signOut}>
                    <span>Salir</span>
                    <i className="icon icon-sign-out ms-2"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}