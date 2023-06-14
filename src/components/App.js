import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import '../App.css';
import InfoTooltip from './InfoTooltip';
import { getToken } from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [card, setCard] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      getToken(jwt)
        .then(res => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', {replace: true});
          }
        })
    }
  }

  function changeRegistrationState(boolean) {
    setIsRegistrationSuccess(boolean);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    return api.setUserInfo({ name, about })
      .then(res => {
        return setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
        })
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    return api.changeAvatar(avatar)
      .then(res => {
        return setCurrentUser({
          ...currentUser,
          avatar: res.avatar
        })
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        let index;
        cards.forEach((c, i) => {
          if (c._id === card._id) {
            index = i;
          }
        })
        cards[index] = newCard;
        setCards([...cards])
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleCardDelete(event) {
    event.preventDefault();

    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => card._id !== c._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    return api.addNewCard({name, link })
      .then(newCard => {
        return setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <LoggedInContext.Provider value={{loggedIn, setLoggedIn}} >
        <div className="page">
          <Header email={email} />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  cards={cards}
                  onCardLike={handleCardLike}
                  // onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  openDeleteCardPopup={handleDeleteCardClick}
                  element={Main}
                />
              }
            />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} checkToken={checkToken} />} />
            <Route
              path="sign-up"
              element={
                <Register
                  changeRegistrationState={changeRegistrationState}
                />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"
            onClose={closeAllPopups}
            isOpen={isDeleteCardPopupOpen}
            isSubmitting={true}
            onSubmit={handleCardDelete}
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isRegistrationSuccess={isRegistrationSuccess}
          />
        </div>
      </LoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
