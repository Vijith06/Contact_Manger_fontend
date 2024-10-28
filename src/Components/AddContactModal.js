import React, { useState } from 'react';
import axios from 'axios';

const AddContactModal = ({ isOpen, onClose, onContactAdded }) => {
    const [name, setName] = useState('');
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const [email, setEmail] = useState('');
    const [emergencyContact, setEmergencyContact] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [address, setAddress] = useState('');
    const [company, setCompany] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [image, setImage] = useState(null);

    const handlePhoneNumberChange = (index, value) => {
        const newPhoneNumbers = [...phoneNumbers];
        newPhoneNumbers[index] = value;
        setPhoneNumbers(newPhoneNumbers);
    };

    const addPhoneNumberField = () => {
        setPhoneNumbers([...phoneNumbers, '']);
    };

    const handleAddContact = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        phoneNumbers.forEach((number) => formData.append('phoneNumbers', number)); 
        formData.append('email', email);
        formData.append('emergencyContact', emergencyContact);
        formData.append('bloodGroup', bloodGroup);
        formData.append('address', address);
        formData.append('company', company);
        formData.append('linkedin', linkedin);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('http://localhost:8080/api/contacts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onContactAdded(); 
            onClose(); 
        } catch (error) {
            console.error('Error adding contact:', error.response ? error.response.data : error.message);
        }
    };

    if (!isOpen) return null;

    const styles = {
        modal: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
        },
        background: {
            backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/007/067/602/small_2x/businessman-shows-outstretched-hand-with-social-icon-on-virtual-screen-contact-us-free-photo.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(11px)', 
            zIndex: -1,
        },
        modalContent: {
            borderRadius: '22px',
            backgroundColor: 'rgba(169, 169, 169, 0.8)', // 50% transparent Dark Gray

            boxShadow: '0 8px 16px rgba(0, 0, 0, 3)',
            padding: '25px',
            width: '80%', // Responsive width
            maxWidth: '420px',
            maxHeight: '80%',
            overflowY: 'auto',
            position: 'relative',
            margin: '10px', // Optional for spacing
            textAlign: 'left',
        },
        
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        label: {
            display: 'flex',
            flexDirection: 'column',
            fontSize: '15px',
            marginBottom: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            

        },
        input: {
            padding: '10px',
            fontSize: '14px',
            

            borderRadius: '8px',
            border: '4px solid #A9A9A9',
            outline: 'none',
            transition: 'border-color 0.3s',
        },
        inputFocus: {
            borderColor: '#007bff',
        },
        buttonGroup: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        submitButton: {
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        submitButtonHover: {
            backgroundColor: '#0056b3',
        },
        cancelButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            cursor: 'pointer',
        },
        addPhoneButton: {
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 15px',
            cursor: 'pointer',
            alignSelf: 'start',
        },
    };

    return (
        <div style={styles.modal}>
                                <div style={styles.background} /> {/* This is the blurred background */}

            <div style={styles.modalContent}>
                <h2 style={{             textAlign: 'center',
color: '#006400' }}>Add Contact</h2>
                <form onSubmit={handleAddContact} style={styles.form}>
                    <label style={styles.label}>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={styles.input}
                            className="input"
                        />
                    </label>

                    {phoneNumbers.map((number, index) => (
                        <label key={index} style={styles.label}>
                            Phone Number:
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                                required
                                style={styles.input}
                            />
                        </label>
                    ))}
                    <button type="button" onClick={addPhoneNumberField} style={styles.addPhoneButton}>
                        Add Another Phone Number
                    </button>

                    <label style={styles.label}>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Emergency Contact:
                        <input type="text" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Blood Group:
                        <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Address:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Company:
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        LinkedIn:
                        <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} style={styles.input} />
                    </label>
                    <label style={styles.label}>
                        Image:
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} style={styles.input} />
                    </label>

                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.submitButton}>
                            Add Contact
                        </button>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContactModal;
