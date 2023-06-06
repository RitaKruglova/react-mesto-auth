import AuthenticationForm from "./AuthenticationForm";
import { Link } from 'react-router-dom';

function Register() {

  return (
    <>
      <AuthenticationForm buttonText="Зарегистрироваться" title="Регистрация" />
      <Link className="authentication__link" to="/sign-in" >Уже зарегистрированы? Войти</Link>
    </>
  )
}

export default Register;