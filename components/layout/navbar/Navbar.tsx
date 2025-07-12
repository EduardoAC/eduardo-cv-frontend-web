'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog'},
  { href: '/my-projects', label: 'My Projects' },
  { href: '/my-experience', label: 'My Experience' },
  { href: '/contact', label: 'Contact' },
]

export const Navbar = ({ pageTitle }: { pageTitle: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navbarBrand}>{pageTitle}</Link>
        
        <ul className={styles.navbarNavDesktop}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <button 
          className={`${styles.navbarToggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
        </button>
      </nav>

      <div className={`${styles.mobileSidebar} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileSidebarHeader} onClick={closeMenu}>
          <div className={styles.closeIcon}>&times;</div>
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
