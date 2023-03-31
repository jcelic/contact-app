import './style.scss';
import Navigation from 'components/Navigation';
import SearchInput from 'components/SearchInput';
import { useContext, useState } from 'react';
import ContactsContext from 'context/contacts.context';
import { Link } from 'react-router-dom';
import ContactCard from 'components/ContactCard';
import AddCard from 'components/AddCard';
import Form from 'components/Form';
import Modal from 'components/Modal';
import ToTopBtn from 'components/ToTopBtn';
import Loader from 'components/Loader';
import { getContacts } from 'http/contacts.http';
import { AnimatePresence } from 'framer-motion';

const ContactList = ({ favorites }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);

  const { contacts, setContacts, isLoading } = useContext(ContactsContext);

  // GET ALL CONTACTS ON APP LOAD
  const fetchContacts = async () => {
    const contacts = await getContacts();
    setContacts(contacts);
    setFirstLoad(false);
  };

  if (firstLoad) {
    fetchContacts();
  }

  // GET ALL FAVORITE CONTACTS
  const favoriteContacts = contacts.filter(contact => contact.isFavorite);

  // SEARCH CONTACTS
  const filteredContacts = contacts.filter(({ name, surname }) => {
    const value = `${name} ${surname}`.toLowerCase();
    return value.includes(filter.toLowerCase());
  });

  const enableOverflow = () => {
    document.body.style.overflow = 'scroll';
  };

  const contactsArray = favorites ? favoriteContacts : filteredContacts;

  return (
    <>
      <div className='flex-center flex-column'>
        <Navigation />
        <SearchInput
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            visibility:
              favorites || (!favorites && contacts.length === 0)
                ? 'hidden'
                : 'visible',
          }}
        />
      </div>

      <div className='grid'>
        {favorites && favoriteContacts.length === 0 && (
          <p className='message'>No Favorite Contacts</p>
        )}

        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <>
            {!favorites && filteredContacts.length > 0 && (
              <AddCard onClick={() => setAddModalOpen(true)} />
            )}

            <AnimatePresence>
              {addModalOpen && (
                <Modal
                  onClose={() => {
                    setAddModalOpen(false);
                    enableOverflow();
                  }}
                >
                  <Form
                    onClose={() => {
                      setAddModalOpen(false);
                      enableOverflow();
                    }}
                  />
                </Modal>
              )}
            </AnimatePresence>

            {contactsArray.map(contact => (
              <Link to={`/contacts/view/${contact.id}`} key={contact.id}>
                <ContactCard contact={contact} />
              </Link>
            ))}

            {!favorites && contacts.length === 0 && (
              <p className='message'>
                {firstLoad ? 'Loading...' : 'No Contacts'}
              </p>
            )}

            {!favorites &&
              filteredContacts.length === 0 &&
              contacts.length !== 0 && (
                <p className='message'>No Matching Contacts</p>
              )}

            <ToTopBtn />
          </>
        )}
      </div>
    </>
  );
};

export default ContactList;
