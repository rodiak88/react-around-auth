import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ onClose, card, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="delete-popup"
      title="Are you sure?"
      isOpen={card ? true : false}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Yes"
      buttonRenderingText="Deleting..."
    />
  );
}

export default DeleteCardPopup;
