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
              &copy; BizBio
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}