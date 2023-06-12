import logo from '../images/logo.svg';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import HeaderButton from './HeaderButton';
import HeaderInfo from './HeaderInfo';
import { LoggedInContext } from '../contexts/LoggedInContext';

function Header(props) {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenuVisibility() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getTemplate() {
    if (location.pathname === '/sign-in') {
      return (
        <Link className="header__link" to='/sign-up'>Регистрация</Link>
      )
    } else if (location.pathname === '/sign-up') {
      return (
        <Link className="header__link" to='/sign-in'>Войти</Link>
      )
    } else {
      if (width > 768) {
        return (
          loggedIn && <HeaderInfo email={props.email} onClick={logout} />
        )
      } else {
        return (
          <HeaderButton onClick={toggleMenuVisibility} isOpen={isMenuOpen} />
        )
      }
    }
  }

  function logout() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
  }

  return (
    <>
      {width < 768 && isMenuOpen && loggedIn && <HeaderInfo email={props.email} onClick={logout} />}
      <header className="header">
        <img src={logo} alt="Логотип Место" className="header__logo" />
        {getTemplate()}
      </header>
    </>
  )
}

export default Header;