import './style.scss';
import { useContext, useState } from 'react';
import ContactsContext from 'context/contacts.context';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartFilled,
  faTrash,
  faEnvelope,
  faPhone,
  faUser,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { MdHideImage } from 'react-icons/md';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Form from 'components/Form';
import {
  getSingleContact,
  deleteContact,
  updateContact,
} from 'http/contacts.http';
import { AnimatePresence } from 'framer-motion';

const ViewContact = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { contacts, setContacts, singleContact, setSingleContact } =
    useContext(ContactsContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { image, name, surname, email, phone, isFavorite } = singleContact;
  const fullName = `${name} ${surname}`;

  // GET SINGLE CONTACT
  const fetchContact = async () => {
    const contact = await getSingleContact(+id);
    setSingleContact(contact);
  };

  fetchContact();

  // DELETE CONTACT
  const deleteHandler = async id => {
    await deleteContact(id);

    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    setConfirmModalOpen(false);
    navigate('/');
  };

  // TOOGLE FAVORITE
  const favoritesHandler = async () => {
    const updatedContact = await updateContact(id, {
      isFavorite: !isFavorite,
    });

    const updatedContacts = contacts.map(contact =>
      contact.id === id ? updatedContact : contact
    );
    setSingleContact(updatedContact);
    setContacts(updatedContacts);
  };

  // REMOVE IMAGE
  const removeImageHandler = async () => {
    const updatedContact = await updateContact(id, {
      image: null,
    });

    const updatedContacts = contacts.map(contact =>
      contact.id === id ? updatedContact : contact
    );
    setSingleContact(updatedContact);
    setContacts(updatedContacts);
  };

  const enableOverflow = () => {
    document.body.style.overflow = 'scroll';
  };

  return (
    <>
      <div className='details'>
        <div className='details__img'>
          {image ? (
            <img src={image} />
          ) : (
            <FontAwesomeIcon icon={faUser} className='details__icon' />
          )}
        </div>

        <div className='details__info'>
          <div>
            <label>Name:</label>
            <p>
              <FontAwesomeIcon icon={faUser} />
              {name}
              <FontAwesomeIcon
                className='heart-icon'
                icon={isFavorite ? faHeartFilled : faHeart}
                style={{ color: isFavorite ? 'red' : '#000' }}
                onClick={favoritesHandler}
              />
            </p>
          </div>

          <div>
            <label>Surname:</label>
            <p>
              <FontAwesomeIcon icon={faUser} />
              {surname}
            </p>
          </div>

          <div>
            <label>Email:</label>
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              {email}
            </p>
          </div>

          <div>
            <label>Phone Number:</label>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              {phone}
            </p>
          </div>
        </div>

        <div className='details__btns'>
          <Button
            className='btn btn--primary'
            icon={faTrash}
            onClick={() => setConfirmModalOpen(true)}
          >
            Delete
          </Button>

          <AnimatePresence>
            {confirmModalOpen && (
              <Modal
                className='modal--confirm'
                onClose={() => {
                  setConfirmModalOpen(false);
                  enableOverflow();
                }}
                onDelete={() => deleteHandler(+id)}
                confirmModal
              >
                Are you sure you want to delete {fullName}?
              </Modal>
            )}
          </AnimatePresence>

          <Button
            className='btn btn--primary'
            icon={faUserEdit}
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </Button>

          <AnimatePresence>
            {editModalOpen && (
              <Modal
                onClose={() => {
                  setEditModalOpen(false);
                  enableOverflow();
                }}
              >
                <Form
                  editContact={singleContact}
                  onClose={() => {
                    setEditModalOpen(false);
                    enableOverflow();
                  }}
                />
              </Modal>
            )}
          </AnimatePresence>
        </div>

        {image && (
          <Button
            type='button'
            className='btn btn--primary mt-20'
            onClick={removeImageHandler}
          >
            <MdHideImage size={20} />
            Remove Image
          </Button>
        )}
      </div>
    </>
  );
};

export default ViewContact;
