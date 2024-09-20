import React from 'react'
import './DetailsTop.css'

const DetailsTop = ({ album }) => {

    const handleSpotifyClick = () => {
        window.open(album.external_urls.spotify, '_blank');
    }
    return (
        <div className='details-top'>
            <div className='album-name'>{album.name}</div>
            <div className='artists'>{album.artists.map(artist => artist.name).join(', ')}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div className='tracks'>{album.total_tracks} track(s)</div>
                <div className='spotify' onClick={handleSpotifyClick}>Spotify</div>
            </div>
        </div>
    )
}

export default DetailsTop
