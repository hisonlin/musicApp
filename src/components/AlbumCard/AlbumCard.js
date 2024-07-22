import React from 'react';
import Card from 'react-bootstrap/Card';
import './AlbumCard.css';

const AlbumCard = ({detail}) => {
    return (
        <>
            <Card className={'cardItem'}>
                <Card.Img variant="top" src={detail.images[0].url}/>
                <Card.Body>
                    <Card.Title c>{detail.name}</Card.Title>
                    <Card.Text >
                        {detail.artists.map(artist => artist.name).join(', ')}
                    </Card.Text>
                    <Card.Text >
                        {detail.release_date}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

export default AlbumCard;