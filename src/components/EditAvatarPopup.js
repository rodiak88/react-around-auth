import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = React.createRef();

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen, avatarInputRef]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ link: avatarInputRef.current.value });
  }

  return (
    <PopupWithForm
      name="edit-avatar-popup"
      title="Change profile picture"
      isOpen={isOpen}
      buttonText="Save"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        ref={avatarInputRef}
        id="avatar-link-input"
        className="popup__input"
        placeholder="Image link"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
