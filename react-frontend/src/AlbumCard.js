import React from 'react';

const AlbumCard = ({ album }) => {
  console.log({album}) /*added to fix frontend bug*/
  return (
    <div style={styles.card}>
      <h2>{album.title}</h2>
      <p><strong>Release Year:</strong> {album.release_year}</p> {/*Frontend bug - naming convention was corrected using console.log and browser dev tool*/}
      <p><strong>Artist:</strong> {album.artistName}</p> {/*Backend bug*/}
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
