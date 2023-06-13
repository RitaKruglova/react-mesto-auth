function AuthenticationForm(props) {
  return (
    <div className="authentication">
      <h2 className="authentication__title">{props.title}</h2>
      <form className="authentication__form" onSubmit={props.onSubmit}>
        <input
          id="emailInput"
          className="authentication__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={props.formValue.email}
          onChange={props.onChange}
        />
        <span id="emailInputError" className="authentication__error authentication__error_visible"></span>
        <input
          id="passwordInput"
          className="authentication__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={props.formValue.password}
          onChange={props.onChange}
        />
        <span id="passwordInputError" className="authentication__error authentication__error_visible"></span>
        <button
          className="authentication__submit-button"
          type="submit"
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  )
}

export default AuthenticationForm;