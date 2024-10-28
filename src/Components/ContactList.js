// src/components/ContactList.js
import React from 'react';

const ContactList = ({ contacts }) => {
    return (
        <div style={contactListStyles}>
            {contacts.map(contact => (
                <div key={contact.id} style={contactItemStyles}>
                    <img src={contact.imageUrl} alt="Contact" style={iconStyles} />
                    <span>{contact.name}</span>
                </div>
            ))}
        </div>
    );
};

const contactListStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const contactItemStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '80%',
};

const iconStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
};

export default ContactList;
