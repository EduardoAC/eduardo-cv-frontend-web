import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="site-error">
      <h1>404 - Page Not Found</h1>
      
      <div className="alert alert-danger">
        The page you are looking for could not be found.
      </div>

      <p>
        The above error occurred while the Web server was processing your request.
      </p>
      <p>
        Please contact us if you think this is a server error. Thank you.
      </p>

      <div style={{ marginTop: '20px' }}>
        <Link href="/" className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  )
} 