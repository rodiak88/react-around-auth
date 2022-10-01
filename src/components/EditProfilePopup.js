import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    description: "",
  });
  const { name, description } = values;
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [currentUser, setValues, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="edit-popup"
      title="Edit profile"
      isOpen={isOpen}
      buttonText="Save"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={handleChange}
        id="name-input"
        className="popup__input"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        name="description"
        value={description || ""}
        onChange={handleChange}
        id="description-input"
        className="popup__input"
        placeholder="Description"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
