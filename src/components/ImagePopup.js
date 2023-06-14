import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup(props) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(props.card, closeAllPopups);

  return (
    <div className={`popup popup_type_picture${props.card ? ' popup_opened' : ''}`}>
      <div className="popup__container popup__container_place_popup-picture">
        <button type="button" className="popup__reset-button popup__reset-button_place_popup-picture" aria-label="Отменить" onClick={closeAllPopups}></button>
        <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
        <p className="popup__image-name"></p>
      </div>
    </div>
  )
}

export default ImagePopup;