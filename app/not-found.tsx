import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center p-xxl">
      <div className="snap-alert snap-alert-danger">
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
      <div className="mb-md">
        <Link href="/" className="snap-btn snap-btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  )
} 