import React from 'react'
import './DetailsTop.css'
import Image from 'react-bootstrap/Image'

const DetailsTop = ({ album }) => {

    const handleSpotifyClick = () => {
        window.open(album.external_urls.spotify, '_blank');
    }
    return (
        <div className='details-top'>
            <div className='details-top-left'>
                <Image src={album.images[0].url} alt={album.name} fluid
                    style={{
                        borderRadius: '20px',
                        boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
                        width: '400px'
                    }} />

            </div>
            <div className='details-top-right'>
                <div className='album-name'>{album.name}</div>
                <div className='artists'>{album.artists.map(artist => artist.name).join(', ')}</div>
                <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                    <div className='tracks'>{album.total_tracks} track(s)</div>
                    <div className='spotify' onClick={handleSpotifyClick}>Go Spotify</div>
                </div>

            </div>

        </div>
    )
}

export default DetailsTop
