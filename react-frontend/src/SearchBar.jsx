import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search for an artist..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={styles.input}
    />
  );
};

const styles = {
  input: {
    padding: '8px',
    margin: '16px 0',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
};

export default SearchBar;