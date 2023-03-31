import { createContext, useState } from 'react';

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [singleContact, setSingleContact] = useState([]);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
        isLoading,
        setIsLoading,
        singleContact,
        setSingleContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContext;
