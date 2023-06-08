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