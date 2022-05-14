import "../../styles/components/layouts/private.module.scss";

export default function PrivateLayout({ children }) {
  return (
    <>
      <main className="private">{children}</main>
    </>
  )
}