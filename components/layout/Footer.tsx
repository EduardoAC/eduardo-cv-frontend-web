import Link from 'next/link'
import Container from './Container'

interface FooterLink {
  href: string
  label: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  sections?: FooterSection[]
  copyrightText?: string
}

const defaultSections: FooterSection[] = [
  {
    title: 'Navigation',
    links: [
      { href: '/blog', label: 'Business And Technology blog' },
      { href: '/forum', label: 'The brainstorming forum' },
      { href: '/about', label: 'About me' },
      { href: '/contact', label: 'Contact' },
    ]
  },
  {
    title: 'My background',
    links: [
      { href: '/frontend-profile', label: 'As frontend developer' },
      { href: '/software-architect-profile', label: 'As software architect' },
      { href: '/backend-profile', label: 'As backend developer' },
      { href: '/my-experience', label: 'My work experience' },
      { href: '/my-projects', label: 'Projects, hackathons and ideas' },
    ]
  },
  {
    title: 'Useful links',
    links: [
      {
        href: 'https://github.com/EduardoAC',
        label: 'Check me out on GitHub',
        external: true
      },
      {
        href: 'http://www.tuocio.org',
        label: 'TuOcio - Tools for event organizer',
        external: true
      },
      {
        href: 'http://www.dreammakerfactory.com',
        label: 'Dream Maker Factory',
        external: true
      },
    ]
  }
]

export const Footer = ({
  sections = defaultSections,
  copyrightText = 'Eduardo Aparicio Cardenes - Proyectonline'
}: FooterProps) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container variant="default" padding="medium">
        <div className="snap-grid">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`${
                index === 2 ? 'snap-hidden-sm ' : ''
              }snap-col snap-col-sm-6 snap-col-md-4`}
            >
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="profile-link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <hr />
      <Container variant="default" padding="small" className="footer-label">
        <p className="center-block">
          &copy; {copyrightText} {currentYear}
        </p>
      </Container>
    </footer>
  )
}

export type { FooterLink, FooterSection, FooterProps }