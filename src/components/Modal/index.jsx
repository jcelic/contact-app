import './style.scss';
import Button from 'components/Button';
import { createPortal } from 'react-dom';
import { motion as m } from 'framer-motion';

const Modal = ({ children, onClose, onDelete, className, confirmModal }) => {
  document.body.style.overflow = 'hidden';

  return createPortal(
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0 }}
        className='overlay'
        onClick={onClose}
      ></m.div>

      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.2 } }}
        exit={{ scale: 0 }}
        className={`modal ${className}`}
      >
        {children}
        {confirmModal && (
          <div className='modal-btns'>
            <Button className='btn btn--secondary' onClick={onClose}>
              Cancel
            </Button>

            <Button className='btn btn--secondary' onClick={onDelete}>
              Delete
            </Button>
          </div>
        )}
      </m.div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
