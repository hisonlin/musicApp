import React from 'react';
import Card from "react-bootstrap/Card";
import slash from '../../assests/slash.svg'
import { useNavigate } from 'react-router-dom';
import noImgFound from '../../assests/noImgFound.jpg';

const TrackCard = ({ detail, playMusic, icon }) => {
    const slashIcon = <img src={slash} alt='slash' />;

    const imageURL = detail.album.images.length > 0
    ? detail.album.images[0].url
    : noImgFound;

    const handleSpotifyClick = () => {
        window.open(detail.external_urls.spotify, '_blank');
    }

    const navigate = useNavigate();

    const handleAlbumClick = () => {
      navigate(`/album/${detail.album.id}`);
    }
  

    return (
        <Card className={'cardItem'}>
            <Card.Img variant="top" src={imageURL} />
            <Card.Body>
                <Card.Title>{detail.name}</Card.Title>
                <Card.Text>
                    {detail.album.artists.map(artist => artist.name).join(', ')}
                </Card.Text>
                <Card.Text>
                    {detail.album.release_date}
                </Card.Text>
            </Card.Body>
            <Card className='hover-content'>
                <Card.Title>
                    {detail.preview_url ?
                        <div className='play-td' onClick={() => playMusic(detail.id, detail.preview_url)}>
                            {icon}
                        </div> : <div>{slashIcon}</div>}
                </Card.Title>
                <div className='card-bottom'>
                    <Card.Text className='card-album' onClick={handleAlbumClick}>
                        Album
                    </Card.Text>
                    <Card.Text className='card-spotify' onClick={handleSpotifyClick}>
                        Spotify
                    </Card.Text>
                </div>

            </Card>
        </Card>
    );
};

export default TrackCard;