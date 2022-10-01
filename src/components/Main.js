import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  cards,
  onCardClick,
  onCardLike,
  onDeleteCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <div className="avatar__overlay">
            <button
              className="avatar__editBtn"
              onClick={onEditAvatarClick}
            ></button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__name-title">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              aria-label="Edit button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="Add photo"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteCardClick={onDeleteCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
