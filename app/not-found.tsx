import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center" style={{ padding: '50px' }}>
      <div className="snap-alert snap-alert-danger">
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link href="/" className="snap-btn snap-btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  )
} 