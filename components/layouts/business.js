import Link from "next/link";

export default function BusinessLayout({ children }) {
  return (
    <>
      <main className="biz">
        {children}
        <footer>
          <div className="container pb-4 text-center">
            <p className="text-muted m-0">
              <small>
                &copy; {process.env.NEXT_PUBLIC_APP_NAME}
              </small>
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}