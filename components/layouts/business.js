import Link from "next/link";

export default function BusinessLayout({ bg, children }) {
  return (
    <>
      <main className="biz" style={{
        backgroundColor: bg
      }}>
        {children}

        <footer>
          <div className="container">
            <Link href="/" rel="noopener">
             <a className="biz-copy"><small>&copy; {process.env.NEXT_PUBLIC_APP_NAME}</small></a>
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}