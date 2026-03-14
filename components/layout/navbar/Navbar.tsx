'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '../theme/ThemeToggle'
import styles from './Navbar.module.css'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog'},
  { href: '/projects', label: 'Projects' },
  { href: '/my-experience', label: 'My Experience' },
  { href: '/contact', label: 'Contact' },
]

export const Navbar = () => {
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
        <Link href="/" className={styles.navbarBrand}>
          <span className={`${styles.navbarBrandText} hidden-sm`}>Eduardo Aparicio Cardenes - </span>
          <span className={styles.navbarBrandText}>Interactive CV</span>
        </Link>

        <div className={styles.navbarDesktopControls}>
          <ul className={styles.navbarNavDesktop}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle className={styles.desktopThemeToggle} />
        </div>

        <button
          type="button"
          className={`${styles.navbarToggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
          <span className={styles.iconBar}></span>
        </button>
      </nav>

      <div id="mobile-navigation" className={`${styles.mobileSidebar} ${isMenuOpen ? styles.open : ''}`}>
        <button type="button" className={styles.mobileSidebarHeader} onClick={closeMenu}>
          <div className={styles.closeIcon}>&times;</div>
          <span className='heading5'>Close</span>
        </button>
        <ul className={styles.mobileSidebarNav}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link href={item.href} onClick={closeMenu} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileThemeSection}>
          <ThemeToggle className={styles.mobileThemeToggle} variant="mobile-row" />
        </div>
      </div>
      {isMenuOpen && <button type="button" className={styles.sidebarOverlay} onClick={closeMenu} aria-label="Close navigation menu" />}
    </header>
  )
}
