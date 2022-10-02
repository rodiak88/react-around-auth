import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupRenderingContext } from '../contexts/PopupRenderingContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltipPopup from './InfoTooltipPopup';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] =
    React.useState(false);

  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] =
    React.useState(false);

  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] =
    React.useState(false);

  const [isInfoTooltipPopupOpened, setIsInfoTooltipPopupOpened] =
    React.useState(false);

  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState('');

  const [cardToDelete, setCardToDelete] = React.useState(undefined);

  const [isPopupRendering, setIsPopupRendering] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(undefined);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [userEmail, setUserEmail] = React.useState('');

  const [cards, setCards] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setIsLoggedIn(true);
            history.push('/');
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setIsInfoTooltipPopupOpened(false);
    setSelectedCard(undefined);
    setCardToDelete(undefined);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setCardToDelete(card);
  }

  function handleCardDelete(card) {
    setIsPopupRendering(true);
    api
      .deleteCardData(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
        setCardToDelete(undefined);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPopupRendering(false);
      });
  }

  function handleUpdateUser(newData) {
    setIsPopupRendering(true);
    api
      .updateUserInfo(newData)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPopupRendering(false);
      });
  }

  function handleUpdateAvatar(newData) {
    setIsPopupRendering(true);
    api
      .updateUserAvatar(newData)
      .then((user) => {
        setCurrentUser({ ...currentUser, avatar: user.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPopupRendering(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsPopupRendering(true);
    api
      .addCardData(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPopupRendering(false);
      });
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) {
          setInfoTooltipStatus('success');
          history.push('/signin');
        } else {
          setInfoTooltipStatus('fail');
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus('fail');
      })
      .finally(() => {
        setIsInfoTooltipPopupOpened(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem('jwt', res.token);
          history.push('/');
        } else {
          setInfoTooltipStatus('fail');
          setIsInfoTooltipPopupOpened(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipStatus('fail');
        setIsInfoTooltipPopupOpened(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PopupRenderingContext.Provider value={isPopupRendering}>
        <div className='page'>
          <div className='page__container'>
            <Header userEmail={userEmail} onSignOut={onSignOut} />
            <Switch>
              <ProtectedRoute exact path='/' loggedIn={isLoggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeleteCardClick={handleCardDeleteClick}
                />
              </ProtectedRoute>
              <Route path='/signup'>
                <Register onRegister={onRegister} />
              </Route>

              <Route path='/signin'>
                <Login onLogin={onLogin} />
              </Route>

              <Route>
                {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
              </Route>
            </Switch>
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpened}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpened}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpened}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />

            <DeleteCardPopup
              card={cardToDelete}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <InfoTooltipPopup
              isOpen={isInfoTooltipPopupOpened}
              closePopup={closeAllPopups}
              status={infoTooltipStatus}
            />
          </div>
        </div>
      </PopupRenderingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
