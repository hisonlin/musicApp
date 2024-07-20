import React from 'react';
import Card from 'react-bootstrap/Card';
import './AlbumCard.css';

const AlbumCard = ({album}) => {
    return (
        <>
            <Card key={album.id} className={'cardItem'}>
                <Card.Img variant="top" src={album.images[0].url}/>
                <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                        {album.artists.map(artist => artist.name).join(', ')}
                    </Card.Text>
                    <Card.Text>
                        {album.release_date}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>

    );
};

export default AlbumCard;