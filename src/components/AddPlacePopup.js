import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const { values, handleChange, setValues } = useForm({ title: "", link: "" });

  React.useEffect(() => {
    setValues({ title: "", link: "" });
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit(values);
  }

  return (
    <PopupWithForm
      name="add-popup"
      title="New place"
      isOpen={isOpen}
      buttonText="Create"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        id="title-input"
        value={values.title || ""}
        onChange={handleChange}
        className="popup__input"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        type="url"
        name="link"
        id="link-input"
        value={values.link || ""}
        onChange={handleChange}
        className="popup__input"
        placeholder="Image link"
        required
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
