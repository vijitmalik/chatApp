import { useEffect, useState } from "react";
import { makeApiCall } from "../utility";

const ContactModal = ({ setShowModal, selectedContact, setContacts, setSelectedContact }) => {
    const [formData, setFormData] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "attachment": "",
        "comments": "",
    });
    const [formErrors, setFormErrors] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    useEffect(() => {
        if (selectedContact) {
            setFormData({ ...selectedContact });
        }
    }, [selectedContact])

    const validateForm = () => {
        let valid = true;
        const errors = {};

        // Validate first name
        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required";
            valid = false;
        }

        // Validate last name
        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required";
            valid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email address";
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value || "" });
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact();
    }

    const handleRecordsUpdate = () => {
        if(!validateForm()) return;
        if (!selectedContact) {
            makeApiCall('contacts/', 'POST', formData)
                .then(() => {
                    makeApiCall('contacts/').then((data) => setContacts(data));
                })
                .catch(error =>
                    console.log(error))
        }
        else {
            makeApiCall(`contacts/${selectedContact.id}/`, 'PUT', formData)
                .then(() =>
                    makeApiCall('contacts/').then((data) => setContacts(data)))
                .catch(error =>
                    console.log(error))
        }
        handleCloseModal();
    }

    const handleDeleteContact = () => {
        makeApiCall(`contacts/${selectedContact.id}/`, 'DELETE')
            .then(() =>
                makeApiCall('contacts/').then((data) => setContacts(data))
            )
            .catch(error =>
                console.log(error))
        handleCloseModal();
    }

    return (
        <>
            <div className="layover">
            </div>

            <div className="form-modal">
                <modal-header>
                    <h2>Add Record</h2>
                    <button onClick={handleCloseModal}>X</button>
                </modal-header>
                <modal-body>
                    <form>
                        <div className="field-group">
                            <label htmlFor="firstName">First Name*:</label>
                            <input type="text" id="firstName" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                            
                        </div>
                        {formErrors.firstName && <div className="error">{formErrors.firstName}</div>}
                        <div className="field-group">
                            <label htmlFor="lastName">Last Name*:</label>
                            <input type="text" id="lastName" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                        </div>
                        {formErrors.lastName && <div className="error">{formErrors.lastName}</div>}
                        <div className="field-group">
                            <label htmlFor="email">Email*:</label>
                            <input type="email" id="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        {formErrors.email && <div className="error">{formErrors.email}</div>}
                        <div className="field-group">
                            <label htmlFor="attachment">Attachment:</label>
                            <input type="file" id="attachment" placeholder="Upload a file" name="attachment" value={formData.attachment || ""} onChange={handleInputChange} />
                        </div>
                        <div className="field-group">
                            <label htmlFor="comment">Comments:</label>
                            <textarea id="comments" placeholder="Add comments here" name="comments" value={formData.comments} onChange={handleInputChange} />
                        </div>
                    </form>
                </modal-body>
                <modal-footer>
                    <button className="cancelFormButton" onClick={handleCloseModal}>Cancel</button>
                    <button className="deleteFormButton" onClick={handleDeleteContact}>Delete</button>
                    <button className="submitFormButton" onClick={handleRecordsUpdate}>{selectedContact ? "Update Record" : "Add Record"}</button>
                </modal-footer>
            </div>
        </>
    )
}

export default ContactModal;
