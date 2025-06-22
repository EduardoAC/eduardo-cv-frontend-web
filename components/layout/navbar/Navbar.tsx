'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.scss'

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
  brandName = 'Eduardo Aparicio Cardenes', 
  navItems = defaultNavItems,
  pageTitle = brandName
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest(`.${styles.mobileSidebar}`) && !target.closest(`.${styles.navbarToggle}`)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header d-flex align-items-center w-100" style={{width: '100%'}}>
            {/* Page Title on the left */}
            <span className="navbar-title" style={{ fontWeight: 600, fontSize: '1.2rem', color: '#fff', marginLeft: 10 }}>
              {pageTitle}
            </span>
            
            {/* Desktop nav links on the right */}
            <ul className="nav navbar-nav navbar-right d-none d-md-flex flex-row ms-auto" style={{ marginLeft: 'auto' }}>
              {navItems.map((item) => (
                <li key={item.href} className="nav-item" style={{ display: 'inline-block' }}>
                  <Link href={item.href} onClick={closeMenu} className="nav-link" style={{ color: '#fff', padding: '10px 15px' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Hamburger for mobile - This now uses our SCSS module */}
            <button 
              type="button" 
              className={`${styles.navbarToggle} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-sidebar"
              aria-label="Toggle navigation"
            >
              <span className={styles.iconBar}></span>
              <span className={styles.iconBar}></span>
              <span className={styles.iconBar}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - This uses our SCSS module */}
      <div 
        id="mobile-sidebar"
        className={`${styles.mobileSidebar} ${isMenuOpen ? styles.open : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileSidebarHeader} onClick={closeMenu}>
            <div className={`${styles.navbarToggle} ${styles.active}`}>
              <span className={styles.iconBar}></span>
              <span className={styles.iconBar}></span>
              <span className={styles.iconBar}></span>
            </div>
            <span>Close</span>
        </div>
        <ul className={styles.mobileSidebarNav}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={item.href} onClick={closeMenu} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isMenuOpen && <div className={styles.sidebarOverlay} onClick={closeMenu}></div>}
    </header>
  )
}

export type { NavItem, NavbarProps } 