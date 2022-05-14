export default function BusinessLayout({ bg, children }) {
  return (
    <>
      <main className="biz" style={{
        backgroundColor: bg
      }}>
        {children}

        <footer>
          <div className="container">
            <a href="https://bizbio.co" className="biz-copy" target="_blank" rel="noopener">
              &copy; {process.env.NEXT_PUBLIC_APP_NAME}
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}