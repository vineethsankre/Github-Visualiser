import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdClose} from 'react-icons/md'
import './index.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="nav-header">
        <Link to="/" className="nav-link">
          <p className="header-heading">Github Profile Visualizer</p>
        </Link>
        <button className="menu-button" type="button" onClick={toggleMenu}>
          {isMenuOpen ? (
            <MdClose size={20} color="#f8fafc" />
          ) : (
            <GiHamburgerMenu size={20} color="#f8fafc" />
          )}
        </button>
        <ul className="nav-container">
          <Link to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/repositories" className="nav-link">
            <li className="nav-item">Repositories</li>
          </Link>
          <Link to="/analysis" className="nav-link">
            <li className="nav-item">Analysis</li>
          </Link>
        </ul>
        {isMenuOpen && (
          <ul className="mobile-nav-container">
            <Link to="/" className="nav-link">
              <li className="mobile-nav-item">Home</li>
            </Link>
            <Link to="/" className="nav-link">
              <li className="mobile-nav-item">Repositories</li>
            </Link>
            <Link to="/" className="nav-link">
              <li className="mobile-nav-item">Analysis</li>
            </Link>
          </ul>
        )}
      </nav>
    </>
  )
}

export default Header
