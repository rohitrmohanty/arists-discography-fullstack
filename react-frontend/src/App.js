//Step #2 Frontend
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtistCard from './ArtistCard'; //Step #4 JSX
import AlbumCard from './AlbumCard';
import SearchBar from './SearchBar';

const App = () => {
  const [artists, setArtists] = useState([]); // React UseState empty array is defined for artists
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch artists from Express.js Server
    axios.get('http://localhost:3000/artists')
      .then(response => {
        setArtists(response.data); //API data
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

  const retriveArtistName = (artistId) => {
    console.log(artistId)
    const found = artists.find((element) => element.artist_id == artistId);
    console.log(found.name);
    return found.name
    
  }

  return (
    <div style={styles.container}>
      <h1>Artists</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={styles.cardContainer}>
        {/* Step #3 Iterates thorugh artist const to produce several cards, artists.map (over the API data) */}
        {artists.map(data => (
          <ArtistCard key={data.artist_id} artistData={data} />
        ))}
      </div>

      <h1>Albums</h1>
      <div style={styles.cardContainer}>
        {albums.map(album => {
          const artistsName = retriveArtistName(album.artist_id)
          return (
          
          <AlbumCard key={album.album_id} album={album} artistsName={artistsName} />
        )})}
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
