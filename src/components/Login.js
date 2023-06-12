import AuthenticationForm from "./AuthenticationForm";
import { useState } from "react";
import { authorise } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin, checkToken }) {
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

    authorise(formValue.email, formValue.password)
      .then(() => {
        setFormValue({
          email: '',
          password: ''
        });
        handleLogin();
        checkToken();
        navigate('/', {replace: true});
      })
  }

  return (
    <AuthenticationForm
      buttonText="Войти"
      title="Вход"
      onChange={handleChange}
      onSubmit={handleSubmit}
      formValue={formValue}
    />
  )
}

export default Login;