import PopupWithForm from "./PopupWithForm";
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useValidate from "../hooks/useValidate";
import { validateText } from "../utils/validation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const FULLNAME =  'fullname';
  const ABOUT = 'about';

  function validate(values) {
    const errors = {}
    const fullnameError = validateText(values[FULLNAME]);
    const aboutError = validateText(values[ABOUT]);
    if (fullnameError) {
      errors[FULLNAME] = fullnameError;
    }
    if (aboutError) {
      errors[ABOUT] = aboutError;
    }
    return errors;
  }

  const { setValues, values, errors, handleChange, isSubmitting } = useValidate({
    [FULLNAME]: '',
    [ABOUT]: ''
  }, validate);

  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');

  useEffect(() => {
    setValues({[FULLNAME]: currentUser.name, [ABOUT]: currentUser.about});
  }, [currentUser, isOpen]);

  // function handleNameChange(event) {
  //   setName(event.target.value);
  // }

  // function handleDescriptionChange(event) {
  //   setDescription(event.target.value);
  // }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: values[FULLNAME],
      about: values[ABOUT]
    })
  }

  return (
    <PopupWithForm isSubmitting={isSubmitting} onSubmit={handleSubmit} name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose}>
      <fieldset className="popup__info">
        <input
          id="profileNameInput"
          type="text"
          name={FULLNAME}
          className="popup__input popup__input_type_username"
          placeholder="Введите имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values[FULLNAME]}
        />
        <span id="inputNameError" className="popup__error popup__error_visible">{errors[FULLNAME] && errors[FULLNAME]}</span>
        <input
          id="profileDescriptionInput"
          type="text"
          name={ABOUT}
          className="popup__input popup__input_type_about-user"
          placeholder="Введите род деятельности"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChange}
          value={values[ABOUT]}
        />
        <span id="inputAboutUserError" className="popup__error popup__error_visible">{errors[ABOUT] && errors[ABOUT]}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;