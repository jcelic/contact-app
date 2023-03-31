import { Routes, Route, Navigate } from 'react-router-dom';
import Header from 'components/Header';
import ContactList from 'views/App/ContactList';
import ViewContact from 'views/App/ViewContact';
import { ContactsProvider } from 'context/contacts.context';

function App() {
  return (
    <>
      <Header />
      <ContactsProvider>
        <Routes>
          <Route path='*' element={<Navigate to='/contacts/all' replace />} />
          <Route
            path='/contacts/*'
            element={<Navigate to='/contacts/all' replace />}
          />
          <Route path='/contacts/all' element={<ContactList />} />
          <Route
            path='/contacts/favorites'
            element={<ContactList favorites />}
          />
          <Route path='/contacts/view/:id' element={<ViewContact />} />
        </Routes>
      </ContactsProvider>
    </>
  );
}

export default App;
