import { useState } from "react";
import AuthenticationForm from "./AuthenticationForm";
import { Link, useNavigate } from 'react-router-dom';
import { register } from "../utils/auth";

function Register({changeRegistrationState}) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const {name, value} = event.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {email, password} = formValue;
    register(email, password)
      .then(() => {
        changeRegistrationState(true);
      })
      .catch(err => {
        changeRegistrationState(false);
        console.log(err);
      })
  }

  return (
    <>
      <AuthenticationForm
        buttonText="Зарегистрироваться"
        title="Регистрация"
        onChange={handleChange}
        onSubmit={handleSubmit}
        formValue={formValue}
      />
      <Link className="authentication__link" to="/sign-in" >Уже зарегистрированы? Войти</Link>
    </>
  )
}

export default Register;