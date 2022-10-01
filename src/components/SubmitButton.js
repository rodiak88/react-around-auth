import React from "react";
import { PopupRenderingContext } from "../contexts/PopupRenderingContext";

function SubmitButton({ buttonText, buttonRenderingText = "Saving..." }) {
  const isPopupRendering = React.useContext(PopupRenderingContext);

  return (
    <button type="submit" className="popup__submit-btn">
      {isPopupRendering ? buttonRenderingText : buttonText}
    </button>
  );
}

export default SubmitButton;
