import Link from "next/link";

export default function BusinessLayout({ children }) {
  return (
    <>
      <main className="biz">
        {children}
        <footer>
          <div className="container">
            <Link href="/" rel="noopener">
             <a className="text-muted"><small>&copy; {process.env.NEXT_PUBLIC_APP_NAME}</small></a>
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}