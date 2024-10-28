// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header style={headerStyles}>
            <h1>Welcome to Contact Manager</h1>
        </header>
    );
};

const headerStyles = {
    textAlign: 'center',
    color: '#001f3f ',
    fontSize: '1.2rem', // Increased font size
    fontFamily: 'Roboto, sans-serif', // Professional font family
    fontWeight: '500', // Bold font weight
    letterSpacing: '1px', // Slightly increased letter spacing
};

export default Header;
