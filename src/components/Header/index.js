import React, {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
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
      <div className="nav-header">
        <Link to="/">
          <p className="header-heading">Github Profile Visualizer</p>
        </Link>
        <button className="menu-button" onClick={toggleMenu}>
          {isMenuOpen ? (
            <MdClose size={20} color="#f8fafc" />
          ) : (
            <GiHamburgerMenu size={20} color="#f8fafc" />
          )}
        </button>
        <ul className="nav-container">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/repositories">Repositories</Link>
          </li>
          <li className="nav-item">
            <Link to="/">Analysis</Link>
          </li>
        </ul>
        {isMenuOpen && (
          <ul className="mobile-nav-container">
            <li className="mobile-nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/repositories">Repositories</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/">Analysis</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default withRouter(Header)
