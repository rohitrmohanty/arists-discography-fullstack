import React from 'react';

const ArtistCard = ({ artistData }) => {
  return (
    <div style={styles.card}>
      <h2>{artistData.name}</h2> 
      <p><strong>Genre:</strong> {artistData.genre}</p>
      <p><strong>Country:</strong> {artistData.country}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default ArtistCard;
