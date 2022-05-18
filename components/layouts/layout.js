import PublicFooter from "../common/footer";
import PublicHeader from "../common/header";

export default function Layout({ children }) {
  return (
    <>
      <PublicHeader />
      <main className="page">{children}</main>
      <PublicFooter />
    </>
  )
}