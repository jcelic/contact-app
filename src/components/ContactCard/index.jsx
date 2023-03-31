import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faEnvelope,
  faHeart as faHeartFilled,
  faPhone,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import ContactsContext from 'context/contacts.context';
import Modal from 'components/Modal';
import { deleteContact, updateContact } from 'http/contacts.http';
import { motion as m, AnimatePresence } from 'framer-motion';

const ContactCard = ({ contact }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const { contacts, setContacts } = useContext(ContactsContext);

  const { id, image, name, surname, email, phone, isFavorite } = contact;
  const fullName = `${name} ${surname}`;

  // TOGGLE FAVORITE
  const favoritesHandler = async () => {
    const updatedContact = await updateContact(id, {
      isFavorite: !isFavorite,
    });

    const updatedContacts = contacts.map(contact =>
      contact.id === id ? updatedContact : contact
    );
    setContacts(updatedContacts);
  };

  // DELETE CONTACT
  const deleteHandler = async id => {
    await deleteContact(id);

    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const enableOverflow = () => {
    document.body.style.overflow = 'scroll';
  };

  return (
    <m.div
      className='card flex-center flex-column'
      whileHover={{ scale: 1.05 }}
    >
      <div className='card__img flex-center'>
        {contact.image ? (
          <img src={image} alt='' />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>

      <h3 className='mb-10'>{fullName}</h3>

      <p className='flex-center mb-10'>
        <FontAwesomeIcon icon={faEnvelope} />
        {email}
      </p>

      <p className='flex-center mb-10'>
        <FontAwesomeIcon icon={faPhone} />
        {phone}
      </p>

      <div className='card__actions' onClick={e => e.preventDefault()}>
        <FontAwesomeIcon
          icon={faTrash}
          className='trash-icon'
          onClick={() => setConfirmModalOpen(true)}
        />

        <AnimatePresence>
          {confirmModalOpen && (
            <Modal
              className='modal--confirm'
              onClose={() => {
                setConfirmModalOpen(false);
                enableOverflow();
              }}
              onDelete={() => {
                deleteHandler(id);
                enableOverflow();
              }}
              confirmModal
            >
              Are you sure you want to delete {fullName}?
            </Modal>
          )}
        </AnimatePresence>

        <FontAwesomeIcon
          icon={isFavorite ? faHeartFilled : faHeart}
          style={{ color: isFavorite ? 'red' : '#000' }}
          size='lg'
          onClick={favoritesHandler}
        />
      </div>
    </m.div>
  );
};

export default ContactCard;
