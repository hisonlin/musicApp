import React from 'react';
import Card from 'react-bootstrap/Card';
import './AlbumCard.css';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ detail }) => {
    const albumID = detail.id;

    const navigate = useNavigate();

    const handleAlbumClick = () => {
        navigate(`/album/${albumID}`);
    }
    return (
        <>
            <Card className={'cardItem'}>
                <Card.Img variant="top" src={detail.images[0].url} />
                <Card.Body>
                    <Card.Title>{detail.name}</Card.Title>
                    <Card.Text >
                        {detail.artists.map(artist => artist.name).join(', ')}
                    </Card.Text>
                    <Card.Text >
                        {detail.release_date}
                    </Card.Text>
                </Card.Body>
                <Card className='hover-content'>
                    <Card.Title className='view-more-text' onClick={handleAlbumClick}>View More</Card.Title>
                </Card>
            </Card>

        </>
    );
};

export default AlbumCard;