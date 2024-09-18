import React from 'react';
import Card from 'react-bootstrap/Card';
import './SearchResultCard.css';
import noImgFound from '../../assests/noImgFound.jpg';

const SearchResultCard = ({ results, type }) => {
  const imageURL = type === 'tracks'
    ? results.album.images.length > 0
      ? results.album.images[0].url
      : noImgFound
    : results.images.length > 0
      ? results.images[0].url
      : noImgFound;

  const cardHeight = type === 'tracks' ? '350px' : '250px';

  console.log('results' + results);

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
        <Card.Title className='view-more-text'>View More</Card.Title>
      </Card>
    </Card>
  );
};

export default SearchResultCard;