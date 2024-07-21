import React from 'react';
import Card from "react-bootstrap/Card";

const TrackCard = ({detail}) => {
  return (
      <Card className={'cardItem'}>
          <Card.Img variant="top" src={detail.album.images[0].url}/>
          <Card.Body>
              <Card.Title>{detail.name}</Card.Title>
              <Card.Text>
                  {detail.album.artists.map(artist => artist.name).join(', ')}
              </Card.Text>
              <Card.Text>
                  {detail.album.release_date}
              </Card.Text>
          </Card.Body>
      </Card>
  );
};

export default TrackCard;