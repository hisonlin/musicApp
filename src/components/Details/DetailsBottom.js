import React from 'react'
import './DetailsBottom.css'
import playCircle from '../../assests/play-circle.svg'
import stopCircle from '../../assests/stop-circle.svg'
import { useState } from 'react'

const DetailsBottom = ({ album }) => {
    const playIcon = <img src={playCircle} alt='play' />;
    const stopIcon = <img src={stopCircle} alt='stop' />;

    // State to track currently playing audio and track ID
    const [currentAudio, setCurrentAudio] = useState(null);
    const [currentTrackId, setCurrentTrackId] = useState(null);

    // Function to play or stop music
    const playMusic = (trackId, previewUrl) => {
        // If there's an audio playing, stop it
        if (currentAudio) {
            currentAudio.pause();
            setCurrentAudio(null);
        }

        // If the clicked track is not the currently playing track, start the new one
        if (currentTrackId !== trackId) {
            const audio = new Audio(previewUrl);
            audio.play();
            setCurrentAudio(audio);
            setCurrentTrackId(trackId);

            // Set the audio to stop when it finishes playing
            audio.onended = () => {
                setCurrentAudio(null);
                setCurrentTrackId(null);
            };
        } else {
            // If the user clicked the currently playing track, stop the audio
            setCurrentTrackId(null);
        }
    };

    return (
        <div className='details-bottom'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Title</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {album.tracks.items.map((track, index) => (
                        <tr key={track.id}>
                            <td>{index + 1}</td>
                            {track.preview_url ?<td className='play-td' onClick={() =>  playMusic(track.id, track.preview_url)}>
                                {/* Conditionally render play or stop icon */}
                                {track.id === currentTrackId ? stopIcon : playIcon}
                            </td>:<td></td>}
                            <td>{track.name}</td>
                            <td>{(track.duration_ms / 60000).toFixed(2)}m</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetailsBottom;
