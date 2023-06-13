import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect, useContext } from 'react';
import { validateLink } from "../utils/validation";
import useValidate from "../hooks/useValidate";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = useRef();
  const AVATAR = 'avatar';

  function validate(values) {
    const errors = {}
    const avatarError = validateLink(values[AVATAR]);
    if (avatarError) {
      errors[AVATAR] = avatarError;
    }
    return errors;
  }

  const { setValues, values, errors, handleChange, isSubmitting } = useValidate({
    [AVATAR]: '',
  }, validate);

  useEffect(() => {
    setValues({[AVATAR]: ''})
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: values[AVATAR]
    })
  }

  return (
    <PopupWithForm isSubmitting={isSubmitting} onSubmit={handleSubmit} name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} >
      <fieldset className="popup__info">
        <input
          id="input-link-avatar"
          type="url"
          name={AVATAR}
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values[AVATAR]}
        />
        <span id="input-link-avatar-error" className="popup__error popup__error_visible">{errors[AVATAR] && errors[AVATAR]}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;