import React from 'react';

const AlbumCard = ({ album }) => {
  return (
    <div style={styles.card}>
      <h2>{album.title}</h2>
      <p><strong>Release Year:</strong> {album.releaseYear}</p>
      <p><strong>Artist:</strong> {album.artistName}</p>
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

export default AlbumCard;
