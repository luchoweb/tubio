export default function BusinessLayout({ children }) {
  return (
    <>
      <main className="biz">
        {children}
        <footer>
          <div className="container">
            <a href={process.env.NEXT_PUBLIC_APP_URL} target="_blank" rel="noopener" className="text-muted"><small>&copy; {process.env.NEXT_PUBLIC_APP_NAME}</small></a>
          </div>
        </footer>
      </main>
    </>
  )
}