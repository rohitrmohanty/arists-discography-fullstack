import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtistCard from './ArtistCard';
import AlbumCard from './AlbumCard';
import SearchBar from './SearchBar';

const App = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch artists
    axios.get('http://localhost:3000/artists')
      .then(response => {
        setArtists(response.data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      });

    // Fetch albums
    axios.get('http://localhost:3000/albums')
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      axios.get('http://localhost:3000/artists')
        .then(response => {
          setArtists(response.data);
        })
        .catch(error => {
          console.error('Error fetching artists:', error);
        });
    } else {
      axios.get(`http://localhost:3000/search/artists?name=${searchQuery}`)
        .then(response => {
          setArtists(response.data);
        })
        .catch(error => {
          console.error('Error searching artists:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div style={styles.container}>
      <h1>Artists</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={styles.cardContainer}>
        {artists.map(artist => (
          <ArtistCard key={artist.artist_id} artist={artist} />
        ))}
      </div>

      <h1>Albums</h1>
      <div style={styles.cardContainer}>
        {albums.map(album => (
          <AlbumCard key={album.album_id} album={album} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '16px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default App;
