// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div style={searchBarStyles}>
            <input
                type="text"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyles}
            />
        </div>
    );
};

const searchBarStyles = {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
};

const inputStyles = {
    padding: '10px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

export default SearchBar;
