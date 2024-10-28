import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddContactModal from './AddContactModal';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleContactAdded = () => {
        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleImageClick = (contact) => {
        navigate("/Service", { state: { selectedContact: contact } });
    };

    // Inline styles
    const styles = {
        app: {
            position: 'relative',
            minHeight: '100vh',
            overflow: 'hidden', // Prevent content overflow
            zIndex: 0, // Ensure it stays behind the content
        },
        background: {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundImage: 'url("https://www.shutterstock.com/image-photo/human-communication-network-concept-resources-600nw-2003840618.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(11px)', // Blur effect for the background image
            zIndex: -1, // Ensure it stays behind the content
        },
        appContainer: {
            position: 'relative', // Keep content above the background
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            textAlign: 'center',
        },
        
        title: {
            color: '#343a40',
            marginBottom: '20px',
        },
        searchBar: {
            padding: '10px',
            width: '100%',
            maxWidth: '400px',
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            border: '2px solid #ccc',
            fontSize: '16px',
        },
        contactList: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '20px',
        },
        contactCard: {
            backgroundColor: '#D1D1D1',
            borderRadius: '25px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 1)',
            margin: '10px',
            padding: '10px',
            textAlign: 'center',
            width: '120px',
            cursor: 'pointer',
        },
        contactImage: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '5px',
        },
        contactName: {
            fontWeight: 'bold',
            color: '#495057',
        },
        addContactBtn: {
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
        },
        addContactBtnHover: {
            backgroundColor: '#0056b3',
        },
        addIcon: {
            width: '70px',
            height: '70px',
            borderRadius: '100px',
        },
        modalOverlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            width: '400px',
            maxHeight: '80%',
            overflowY: 'auto',
        },
    };

    return (
        <div style={styles.app}>
                    <div style={styles.background} /> {/* This is the blurred background */}

            <div style={styles.appContainer}>
                <Header />
                
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchBar}
                />

                <div style={styles.contactList}>
                    {filteredContacts.map(contact => (
                        <div style={styles.contactCard} key={contact.id}>
                            {contact.image ? (
                                <img
                                    src={`data:image/jpeg;base64,${contact.image}`}
                                    alt={contact.name}
                                    style={styles.contactImage}
                                    onClick={() => handleImageClick(contact)}
                                />
                            ) : (
                                <div style={styles.contactImage} onClick={() => handleImageClick(contact)}>No Image</div>
                            )}
                            <div style={styles.contactName}>{contact.name}</div>
                        </div>
                    ))}
                </div>

                <button
                    style={styles.addContactBtn}
                    onClick={() => setIsModalOpen(true)}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.addContactBtnHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.addContactBtn.backgroundColor)}
                >
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20220713/pngtree-add-contact-icon-chat-blue-discussion-photo-image_8656874.jpg" alt="Add Contact" style={styles.addIcon} />
                </button>

                <AddContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onContactAdded={handleContactAdded}
                />
            </div>
        </div>
    );
};

export default App;
