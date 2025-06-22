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

      <div className="text-center">
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="snap-btn snap-btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  )
} 