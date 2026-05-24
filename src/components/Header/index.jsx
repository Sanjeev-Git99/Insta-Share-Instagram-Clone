import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const noop = () => {}

const Header = props => {
  const navigate = useNavigate()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const {
    onChangeSearchInput = noop,
    searchInput = '',
    getSearchResults = noop,
    onSearchInputKeyDown = noop,
    onChangeSearchMode = noop,
    onChangeSearchModeDesktop = noop,
    onChangeSearchModeOff = noop,
    pageActive = '',
    searchMode = false,
    showSearch = false,
  } = props

  const isSearchEnabled = showSearch || pageActive === 'HOME'

  const onClickLogout = () => {
    Cookies.remove('jwt_token', {path: '/'})
    navigate('/login', {replace: true})
  }

  const onShowMobileMenu = () => {
    setShowMobileMenu(prev => !prev)
  }

  const classHomeActive =
    pageActive === 'HOME' && !searchMode ? 'nav-link-active' : ''
  const classProfileActive = pageActive === 'PROFILE' ? 'nav-link-active' : ''
  const classSearchModeActive = searchMode === true ? 'nav-link-active' : ''

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link
            to="/"
            className="nav-bar-website-logo-link"
            onClick={onChangeSearchModeOff}
          >
            <img
              className="nav-website-logo"
              src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
              alt="website logo"
            />
            <h1 className="nav-website-name">Insta Share</h1>
          </Link>
          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onShowMobileMenu}
          >
            <GiHamburgerMenu className="nav-mobile-menu-icon" />
          </button>
        </div>
        <div className="nav-bar-large-container">
          <Link
            to="/"
            className="nav-bar-website-logo-link"
            onClick={onChangeSearchModeOff}
          >
            <img
              className="nav-website-logo"
              src="https://res.cloudinary.com/dmlhm8dwi/image/upload/v1682664216/Standard_Collection_8website-logo-sm_rj35e0.png"
              alt="website logo"
            />
            <h1 className="nav-website-name">Insta Share</h1>
          </Link>
          <ul className="nav-menu">
            {isSearchEnabled && (
              <li
                className="nav-search-bar"
                onClick={onChangeSearchModeDesktop}
              >
                <input
                  onChange={onChangeSearchInput}
                  onKeyDown={onSearchInputKeyDown}
                  type="search"
                  className="nav-search-input"
                  placeholder="Search Caption"
                  value={searchInput}
                />
                <button
                  type="button"
                  data-testid="searchIcon"
                  className="nav-search-button"
                  onClick={getSearchResults}
                >
                  <FaSearch className="nav-search-icon" />
                </button>
              </li>
            )}
            <li className="nav-menu-item" onClick={onChangeSearchModeOff}>
              <Link to="/" className={`nav-link ${classHomeActive}`}>
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link
                to="/my-profile"
                className={`nav-link ${classProfileActive}`}
              >
                Profile
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="nav-menu-mobile">
          <ul className="nav-menu-list-mobile">
            <li
              className="nav-menu-item-mobile"
              onClick={onChangeSearchModeOff}
            >
              <Link to="/" className={`nav-link ${classHomeActive}`}>
                Home
              </Link>
            </li>
            {isSearchEnabled && (
              <li className="nav-menu-item-mobile" onClick={onChangeSearchMode}>
                <Link to="/" className={`nav-link ${classSearchModeActive}`}>
                  Search
                </Link>
              </li>
            )}
            <li className="nav-menu-item-mobile">
              <Link
                to="/my-profile"
                className={`nav-link ${classProfileActive}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-menu-item-mobile-logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
            <li>
              <button
                onClick={onShowMobileMenu}
                type="button"
                className="nav-menu-item-mobile-close-btn"
              >
                <AiFillCloseCircle />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Header
