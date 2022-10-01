import React from 'react';
import siteLogo from '../images/logo_white.svg';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

function Header({ userEmail, onSignOut }) {
  const [showMobileHeader, setShowMobileHeader] = React.useState(false);

  return (
    <header className='header'>
      <div
        className={
          showMobileHeader
            ? 'header__nav-wrapper-mobile header__nav-wrapper-mobile_active'
            : 'header__nav-wrapper-mobile'
        }
      >
        <p className='header__userEmail'>{userEmail}</p>
        <button className='header__logout-btn' onClick={onSignOut}>
          Log out
        </button>
      </div>
      <div
        className={
          showMobileHeader
            ? 'header__wrapper header__wrapper-mobile'
            : 'header__wrapper'
        }
      >
        <img className='logo' src={siteLogo} alt='Around The U.S. logo' />
        <Route exact path='/'>
          <button
            className={
              showMobileHeader ? 'header__close-btn' : 'header__burger-icon'
            }
            onClick={() => setShowMobileHeader((show) => !show)}
          ></button>
          <div className='header__nav-wrapper'>
            <p className='header__userEmail'>{userEmail}</p>
            <button className='header__logout-btn' onClick={onSignOut}>
              Log out
            </button>
          </div>
        </Route>
        <Route path='/signup'>
          <Link className='header__link' to='/signin'>
            Log in
          </Link>
        </Route>
        <Route path='/signin'>
          <Link className='header__link' to='/signup'>
            Sign up
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
