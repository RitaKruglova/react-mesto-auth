import success from '../images/state-succes.svg';
import failed from '../images/state-failed.svg';
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) {
  const navigate = useNavigate();

  function handleClose() {
    props.onClose();
    if (props.isRegistrationSuccess) {
      navigate('/sign-in');
    }
  }
  return (
    <div className={`popup popup_type_info-tooltip${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container popup__container_place_info-tooltip">
        <button type="button" className="popup__reset-button" aria-label="Отменить" onClick={handleClose}></button>
        <img className="popup__state-image" src={props.isRegistrationSuccess ? success : failed} />
        <h3 className="popup__title popup__title_place_info-tooltip">{props.isRegistrationSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip;