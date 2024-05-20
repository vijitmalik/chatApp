import { useEffect, useState } from 'react';
import './App.css';
import ContactRecords from './components/ContactRecords';
import ContactModal from './components/ContactModal';
import { makeApiCall } from './utility';
import Header from './components/Header';

function App() {

  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState("");
  const [selectedContact, setSelectedContact] = useState();

  useEffect(() => {
    makeApiCall('contacts/').then((data) => setContacts(data));
  }, [])

  useEffect(() => {
    if (selectedContact) { setShowModal(true) } else { setShowModal(false) }
  }, [selectedContact])

  return (
    <div className="app">
      <Header setShowModal={setShowModal}/>
      <ContactRecords contacts={contacts} setSelectedContact={setSelectedContact} />
      {showModal && <ContactModal setShowModal={setShowModal} selectedContact={selectedContact} setContacts={setContacts} setSelectedContact={setSelectedContact} />}
    </div>
  );
}

export default App;
