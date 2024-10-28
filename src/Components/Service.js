import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Service = () => {
    const location = useLocation();
    const selectedContact = location.state?.selectedContact;
    const [contactData, setContactData] = useState(selectedContact || {});
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedContact) {
            alert('No contact selected.');
            navigate('/home');
        }
    }, [selectedContact, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData({
            ...contactData,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        setIsEditMode(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/contacts/${contactData.id}`, contactData)
            .then(() => {
                setIsEditMode(false);
                navigate("/Service", { state: { selectedContact: selectedContact } });
            })
            .catch((error) => {
                console.error('Error updating contact:', error);
                alert('Failed to update contact.');
            });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            axios.delete(`http://localhost:8080/api/contacts/${contactData.id}`)
                .then(() => {
                    navigate('/home');
                })
                .catch((error) => {
                    console.error('Error deleting contact:', error);
                    alert('Failed to delete contact.');
                });
        }
    };

    const handleClose = () => {
        navigate('/home');
    };

    const styles = {
        card: {
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '32px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 2)',
            maxWidth: '500px',
            margin: '50px auto',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            marginBottom: '20px',
            color: '#343a40',
            
            fontSize: '28px',
            fontWeight: '600',
        },
        buttonContainer: {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
        },
        button: {
            padding: '12px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 'bold',
            transition: 'background-color 0.3s, transform 0.3s',
            width: '32%',
        },
        updateButton: {
            backgroundColor: '#28a745', // Green for update
        },
        deleteButton: {
            backgroundColor: '#dc3545', // Red for delete
        },
        closeButton: {
            backgroundColor: '#6c757d', // Gray for close
        },
        formInput: {
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            border: '1px solid #ced4da',
            borderRadius: '8px',
            fontSize: '16px',
            color: '#495057',
        },
        formGroup: {
            marginBottom: '20px',
            textAlign: 'left',
        },
    };

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>Contact Details</h2>

            {isEditMode ? (
                <form onSubmit={handleUpdateSubmit}>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={contactData.name}
                            onChange={handleInputChange}
                            style={styles.formInput}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="phoneNumbers"
                            placeholder="Phone Numbers (comma separated)"
                            value={contactData.phoneNumbers}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={contactData.email}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="emergencyContact"
                            placeholder="Emergency Contact"
                            value={contactData.emergencyContact}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="bloodGroup"
                            placeholder="Blood Group"
                            value={contactData.bloodGroup}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={contactData.address}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={contactData.company}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn"
                            value={contactData.linkedin}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                    </div>

                    <div style={styles.buttonContainer}>
                        <button type="submit" style={{ ...styles.button, ...styles.updateButton }}>Submit Update</button>
                    </div>
                </form>
            ) : (
                <>
                   <div style={{ textAlign: 'left' }}>
    <p><strong>Name:</strong> {contactData.name}</p>
    <p><strong>Phone Numbers:</strong> {contactData.phoneNumbers ? contactData.phoneNumbers.join(', ') : 'N/A'}</p>
    <p><strong>Email:</strong> {contactData.email || 'N/A'}</p>
    <p><strong>Emergency Contact:</strong> {contactData.emergencyContact || 'N/A'}</p>
    <p><strong>Blood Group:</strong> {contactData.bloodGroup || 'N/A'}</p>
    <p><strong>Address:</strong> {contactData.address || 'N/A'}</p>
    <p><strong>Company:</strong> {contactData.company || 'N/A'}</p>
    <p><strong>LinkedIn:</strong> {contactData.linkedin || 'N/A'}</p>
</div>


                    <div style={styles.buttonContainer}>
                        <button onClick={handleUpdate} style={{ ...styles.button, ...styles.updateButton }}>Update</button>
                        <button onClick={handleDelete} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
                        <button onClick={handleClose} style={{ ...styles.button, ...styles.closeButton }}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Service;
