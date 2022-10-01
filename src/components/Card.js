import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  onDeleteCardClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    onDeleteCardClick(card);
  }

  return (
    <li className="card">
      <div
        className="card__photo-container"
        role="img"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      >
        {isOwner && (
          <button
            className="card__delete-btn"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            className={`card__like-btn + ${isLiked && "card__like-btn_active"}`}
            type="button"
            onClick={handleLikeClick}
          ></button>

          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
