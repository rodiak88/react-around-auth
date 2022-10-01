function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? "popup__active" : ""}`}>
      <div className="popup__container popup__container_type_photoPreview">
        <button
          id="viewer-closeBtn"
          className="popup__close-btn popup__close-btn_type_place"
          type="button"
          aria-label="Close window"
          onClick={onClose}
        ></button>
        <img
          className="popup__photo"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__photoTitle">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
