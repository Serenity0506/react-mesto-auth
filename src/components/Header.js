import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/Vector.svg';

export const Header = ({ isLoggedIn, email, onSignOut }) => {

  const UnauthUser = () => (
    <>
      <NavLink
        className={'header__link'}
        to='/sign-up'
      >Регистрация</NavLink>
      <NavLink
        className={'header__link'}
        to='/sign-in'
      >Войти</NavLink>
    </>
  )

  const AuthUser = () => (
    <>
      <span className='header__email'>{email}</span>
      <span className='header__link' onClick={onSignOut}>Выйти</span>
    </>
  )

  return (
    <>
      <header className='header'>
        <img className='header__logo' alt='место' src={logo} />
        {isLoggedIn ? <AuthUser /> : <UnauthUser />}
      </header>
    </>
  )
}

export default Header;