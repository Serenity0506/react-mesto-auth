import React from 'react';
import logo from '../images/Vector.svg';


export const Header = () => {

  return (
    <header className='header'>
      <img className='header__logo' alt='место' src={logo} />
    </header>
  )
}

export default Header;