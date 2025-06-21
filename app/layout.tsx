import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BootstrapClient from '../components/BootstrapClient'
import './globals.css'
import '../styles/main.scss'
import './components.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eduardo Aparicio Cardenes - Interactive CV',
  description: 'I am passionate software architect that loves create new products and see how they become successful. I did this site to collect my career.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient />
        <div className="wrap">
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">My Interactive CV</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/my-projects">My Projects</a></li>
                  <li><a href="/my-experience">My Experience</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            {children}
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="col-sm-6 col-md-4">
              <h3>Navigation</h3>
              <ul>
                <li><a href="/blog" className="profile-link">Business And Technology blog</a></li>
                <li><a href="/forum" className="profile-link">The brainstorming forum</a></li>
                <li><a href="/about" className="profile-link">About me</a></li>
                <li><a href="/contact" className="profile-link">Contact</a></li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-4">
              <h3>My background</h3>
              <ul>
                <li><a href="/frontend-profile" className="profile-link">As frontend developer</a></li>
                <li><a href="/software-architect-profile" className="profile-link">As software architect</a></li>
                <li><a href="/backend-profile" className="profile-link">As backend developer</a></li>
                <li><a href="/my-experience" className="profile-link">My work experience</a></li>
                <li><a href="/my-projects" className="profile-link">Projects, hackathons and ideas</a></li>
              </ul>
            </div>
            <div className="hidden-sm col-md-4">
              <h3>Useful links</h3>
              <ul>
                <li><a href="https://github.com/EduardoAC" target="_blank" rel="noopener noreferrer">Check me out on GitHub</a></li>
                <li><a href="http://www.tuocio.org" target="_blank" rel="noopener noreferrer">TuOcio - Tools for event organizer</a></li>
                <li><a href="http://www.dreammakerfactory.com" target="_blank" rel="noopener noreferrer">Dream Maker Factory</a></li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="container footer-label">
            <p className="center-block">&copy; Eduardo Aparicio Cardenes - Proyectonline {new Date().getFullYear()}</p>
          </div>
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
              ga('create', 'UA-72558130-1', 'auto');
              ga('send', 'pageview');
            `,
          }}
        />
      </body>
    </html>
  )
} 