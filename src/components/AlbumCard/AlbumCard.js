import React from 'react';
import Card from 'react-bootstrap/Card';
import './AlbumCard.css';
import { useNavigate } from 'react-router-dom';
import noImgFound from '../../assests/noImgFound.jpg';

const AlbumCard = ({ detail }) => {
    const albumID = detail.id;

    const imageURL = detail.images.length > 0
        ? detail.images[0].url
        : noImgFound;

    const navigate = useNavigate();

    const handleAlbumClick = () => {
        navigate(`/album/${albumID}`);
    }

    const handleSpotifyClick = () => {
        window.open(detail.external_urls.spotify, '_blank');
    }
    
    return (
        <>
            <Card className={'cardItem'}>
                <Card.Img variant="top" src={imageURL} />
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
                    <div className='card-bottom'>
                        <div></div>
                        <Card.Text className='card-spotify' onClick={handleSpotifyClick}>
                            Spotify
                        </Card.Text>
                    </div>

                </Card>

            </Card>

        </>
    );
};

export default AlbumCard;