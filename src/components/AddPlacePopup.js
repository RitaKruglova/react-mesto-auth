import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from 'react';
import useValidate from "../hooks/useValidate";
import { validateText, validateLink } from "../utils/validation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const NAME = 'name';
  const LINK = 'link';

  function validate(values) {
    const errors = {}
    const nameError = validateText(values[NAME]);
    const linkError = validateLink(values[LINK]);
    if (nameError) {
      errors[NAME] = nameError;
    }
    if (linkError) {
      errors[LINK] = linkError;
    }
    return errors;
  }

  const { setValues, values, errors, handleChange, isSubmitting } = useValidate({
    [NAME]: '',
    [LINK]: ''
  }, validate);

  useEffect(() => {
    setValues({[NAME]: '', [LINK]: ''});
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: values[NAME],
      link: values[LINK]
    })
  }

  return (
    <PopupWithForm isSubmitting={isSubmitting} onSubmit={handleSubmit} name="add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} >
      <fieldset className="popup__info">
        <input
          id="input-picture-name"
          type="text"
          name={[NAME]}
          className="popup__input popup__input_type_picture-name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values[NAME]}
        />
        <span id="input-picture-name-error" className="popup__error popup__error_visible">{errors[NAME] && errors[NAME]}</span>
        <input
          id="input-link"
          type="url"
          name={[LINK]}
          className="popup__input popup__input_type_picture-link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values[LINK]}
        />
        <span id="input-link-error" className="popup__error popup__error_visible">{errors[LINK] && errors[LINK]}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;