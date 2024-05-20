
const ContactRecords = ({ contacts, setSelectedContact }) => {

    const handleEditRecord = (contact) => {
        setSelectedContact(contact);
    }

    const handleChat = () => {
        console.log("handleChat");
    }

    return (
        <div className="app-body">
            <section className="records-section">
                <h2 className="records-header">Records</h2>
                <div className="records-body">
                    {contacts && contacts.length && contacts.map((contact) => (
                        <div className="record" key={contact.id}>
                            <div>{contact.firstName}</div>
                            <div>{contact.lastName}</div>
                            <button onClick={() => handleChat(contact)}>Chat</button>
                            <button onClick={() => handleEditRecord(contact)}>Edit Record</button>
                        </div>
                    ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ContactRecords;
