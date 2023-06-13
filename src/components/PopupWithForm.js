function PopupWithForm(props) {


  return (
    <div className={`popup popup_type_${props.name}${props.isOpen ? ' popup_opened' : ''}`}>
      <div className={`popup__container popup__container_place_${props.name}`}>
        <button type="button" className="popup__reset-button" aria-label="Отменить" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form onSubmit={props.onSubmit} className="popup__form" name={props.name} noValidate>
          {props.children}
          <button type="submit" className={`popup__submit-button${props.isSubmitting ? '' : ' popup__submit-button_disabled'}`}disabled={!props.isSubmitting} >{props.buttonText || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;