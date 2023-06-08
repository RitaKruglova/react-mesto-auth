import logo from '../images/logo.svg';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick() {
    navigate('/sign-in');
  }

  function getPath() {
    if (location.pathname === '/sign-in') {
      return (
        <Link className="header__link" to='/sign-up'>Регистрация</Link>
      )
    } else if (location.pathname === '/sign-up') {
      return (
        <Link className="header__link" to='/sign-in'>Войти</Link>
      )
    } else {
      return (
        <ul className="header__info">
          <li className="header__email">kruglova@mail.ru</li>
          <li className="header__link" onClick={handleClick}>Выйти</li>
        </ul>
      )
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      {getPath()}
    </header>
  )
}

export default Header;