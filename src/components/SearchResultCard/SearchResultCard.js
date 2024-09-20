import React from 'react';
import Card from 'react-bootstrap/Card';
import './SearchResultCard.css';
import noImgFound from '../../assests/noImgFound.jpg';
import slash from '../../assests/slash.svg';
import { useNavigate } from 'react-router-dom';

const SearchResultCard = ({ results, type, playMusic, icon }) => {
  const slashIcon = <img src={slash} alt='slash' />;
  const imageURL = type === 'tracks'
    ? results.album.images.length > 0
      ? results.album.images[0].url
      : noImgFound
    : results.images.length > 0
      ? results.images[0].url
      : noImgFound;

  const cardHeight = type === 'tracks' ? '350px' : '250px';

  console.log(results);


  const handleSpotifyClick = () => {
    window.open(results.external_urls.spotify, '_blank');
  }

  const navigate = useNavigate();

  const handleAlbumClick = () => {
    navigate(`/album/${results.album.id}`);
  }

  return (
    <Card className="cardItem" id="search-result-card" style={{ minHeight: cardHeight }}>
      <Card.Img variant="top" src={imageURL} alt={results.name} />
      <Card.Body>
        <Card.Title>{results.name}</Card.Title>
        {type === 'tracks' ? (
          <>
            <Card.Text>
              {results.album?.artists.map(artist => artist.name).join(', ')}
            </Card.Text>
            <Card.Text>
              {results.album?.release_date}
            </Card.Text>
          </>
        ) : null}
      </Card.Body>
      <Card className='hover-content'>
        {type === 'tracks' ?
          <Card.Title>
            {results.preview_url ?
              <div className='play-td' onClick={() => playMusic(results.id, results.preview_url)}>
                {icon}
              </div> : <div>{slashIcon}</div>}
          </Card.Title> :
          <Card.Title className='view-more-text'>View More</Card.Title>}
        <div className='card-bottom'>
          {type === 'tracks' ? <Card.Text className='card-album' onClick={handleAlbumClick}>
            Ablum
          </Card.Text>:<div></div>}
          <Card.Text className='card-spotify' onClick={handleSpotifyClick}>
            Spotify
          </Card.Text>
        </div>
      </Card>
    </Card>
  );
};

export default SearchResultCard;