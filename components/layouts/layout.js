import PublicFooter from "../common/footer";
import PublicHeader from "../common/header";

export default function Layout({ className = 'home', children }) {
  return (
    <>
      <PublicHeader />
      <main className={`page page-${className}`}>{children}</main>
      <PublicFooter />
    </>
  )
}