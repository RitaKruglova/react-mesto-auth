function AuthenticationForm({ buttonText }) {

  return (
    <div className="authentication">
      <h2 className="authentication__title"></h2>
      <form className="authentication__form">
        <input
          id="emailInput"
          className="authentication__input"
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <input
          id="passwordInput"
          className="authentication__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <button
          className="authentication__submit-button"
          type="submit"
        >{buttonText}</button>
      </form>
    </div>
  )
}