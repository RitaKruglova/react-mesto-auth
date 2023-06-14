import logo from '../images/logo.svg';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import HeaderButton from './HeaderButton';
import HeaderInfo from './HeaderInfo';
import { LoggedInContext } from '../contexts/LoggedInContext';

function Header({email}) {
  const { loggedIn, setLoggedIn } = useContext(LoggedInContext);
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

  function logout() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
  }

  return (
    <>
      {width < 768 && isMenuOpen && loggedIn && <HeaderInfo email={email} onClick={logout} />}
      <header className="header">
        <img src={logo} alt="Логотип Место" className="header__logo" />
        <Routes>
          <Route
            path='/'
            element={
              width > 768 ? loggedIn && <HeaderInfo email={email} onClick={logout} /> : <HeaderButton onClick={toggleMenuVisibility} isOpen={isMenuOpen} />
            }
          >
          </Route>
          <Route
            path='sign-up'
            element={
              <Link className="header__link" to='/sign-in'>Войти</Link>
            }
          >
          </Route>
          <Route
            path='sign-in'
            element={
              <Link className="header__link" to='/sign-up'>Регистрация</Link>
            }
          >
          </Route>
        </Routes>
      </header>
    </>
  )
}

export default Header;