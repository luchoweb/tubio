export default function PublicFooter() {
  return (
    <footer className="pt-3 pb-3">
      <p className="m-0 text-center">
        <small>
          &copy; {process.env.NEXT_PUBLIC_APP_NAME} una marca <a href="https://codify.com.co" target="_blank" rel="noopener" className="text-muted"><strong>Codify</strong></a>
        </small>
      </p>
    </footer>
  )
}