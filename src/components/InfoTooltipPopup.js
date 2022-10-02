import React from 'react';
import successIcon from '../images/icon-success.svg';
import failIcon from '../images/icon-fail.svg';

function InfoTooltipPopup({ isOpen, closePopup, status }) {
  return (
    <div className={`popup ${isOpen ? 'popup__active' : ''}`}>
      <div className='popup__container popup__container_type_status'>
        <button
          className='popup__close-btn'
          type='button'
          aria-label='Close window'
          onClick={closePopup}
        />
        {status === 'success' ? (
          <>
            <img
              className='popup__status-icon'
              src={successIcon}
              alt='Success icon'
            />
            <p className='popup__status-message'>
              Success! You have now been registered.
            </p>
          </>
        ) : (
          <>
            <img
              className='popup__status-icon'
              src={failIcon}
              alt='Fail icon'
            />
            <p className='popup__status-message'>
              Oops, something went wrong! Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoTooltipPopup;
