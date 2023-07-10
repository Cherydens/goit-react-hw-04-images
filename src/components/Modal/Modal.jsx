import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalImg, Overlay } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL, tags }) {
  useEffect(() => {
    const onKeyDown = e => {
      e.code === 'Escape' && onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = e => {
    e.currentTarget === e.target && onClose();
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalImg src={largeImageURL} alt={tags} />
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
