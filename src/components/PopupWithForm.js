import SubmitButton from "./SubmitButton";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  buttonRenderingText,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup ${isOpen ? "popup__active" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Close window"
          onClick={onClose}
        ></button>
        <form id={name} name={name} className="popup__form" onSubmit={onSubmit}>
          <h2
            className={`popup__title ${
              name === "delete-popup" ? "popup__title_type_delete" : ""
            }`}
          >
            {title}
          </h2>
          {name !== "delete-popup" && (
            <fieldset className="popup__fieldset">{children}</fieldset>
          )}
          <SubmitButton
            buttonText={buttonText}
            buttonRenderingText={buttonRenderingText}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
