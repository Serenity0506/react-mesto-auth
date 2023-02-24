import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Main } from './Main'
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Api from '../utils/Api';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';


function App() {

  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' })
  const [cards, setCards] = useState([]);

  const closeAllPopups = () => {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    // setIsDeletePopupOpen(false);
  };

  useEffect(() => {
    Api.getProfile()
      .then(user => setCurrentUser(user))
      .catch(err => console.error(err.message))
  }, [])

  useEffect(() => {
    Api.getInitialCards().then((cards) => {
      setCards(cards)
    })
      .catch((err) => console.error(err.message));
  }, []);


  const handleCardDelete = (card) => {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(c => c._id !== card._id))
      })
      .catch((err) => console.error(err.message));
  };


  const handleAddCard = (inf) => {
    return Api.addCard(inf).then((newCard) => {
      setCards((prev) => [newCard, ...prev]);
      closeAllPopups()
    })
      .catch((err) => console.error(err.message));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.likeCard(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.error(err.message));
  };



  const handleUpdateUser = (inf) => {
    return Api.updateProfile(inf).then((user) => {
      setCurrentUser(_ => user);
      closeAllPopups();
    })
      .catch((err) => console.error(err.message));
  };


  const handleUpdateAvatar = (inf) => {
    return Api.updateProfileAvatar(inf).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
      .catch((err) => console.error(err.message));
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header />
        <Main
          onCardClick={(card) => setSelectedCard(card)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onAddPlace={() => setIsNewCardPopupOpen(true)}
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </div>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      >
      </ImagePopup>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        isOpen={isNewCardPopupOpen}
        onAddCard={handleAddCard}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      {/* <PopupWithForm
        isOpen={isDeletePopupOpen}
        // onSubmit={handleCardDelete}
        onClose={closeAllPopups}
      /> */}
    </CurrentUserContext.Provider>
  )
}

export default App;