'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavItem {
  href: string
  label: string
}

interface NavbarProps {
  brandName?: string
  navItems?: NavItem[]
  pageTitle?: string
}

const defaultNavItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/my-projects', label: 'My Projects' },
  { href: '/my-experience', label: 'My Experience' },
  { href: '/contact', label: 'Contact' },
]

export const Navbar = ({ 
  brandName = 'My Interactive CV', 
  navItems = defaultNavItems,
  pageTitle = brandName
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header d-flex align-items-center w-100" style={{width: '100%'}}>
            {/* Hamburger for mobile */}
            <button 
              type="button" 
              className="navbar-toggle collapsed me-2" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="navbar-collapse"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* Page Title on the left */}
            <span className="navbar-title" style={{ fontWeight: 600, fontSize: '1.2rem', color: '#fff', marginLeft: 10 }}>
              {pageTitle}
            </span>
            {/* Desktop nav links on the right */}
            <div className="hidden-xs hidden-sm ms-auto" style={{ marginLeft: 'auto' }}>
              <ul className="nav navbar-nav navbar-right">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Mobile dropdown menu */}
          {isMenuOpen && (
            <div className="visible-xs visible-sm" style={{ background: '#222', padding: '10px 0' }}>
              <ul className="nav navbar-nav" style={{ display: 'block' }}>
                {navItems.map((item) => (
                  <li key={item.href} style={{ display: 'block' }}>
                    <Link href={item.href} onClick={closeMenu} style={{ color: '#fff', padding: '10px 20px', display: 'block' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export type { NavItem, NavbarProps } 