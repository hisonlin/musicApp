import React, {useState, useEffect} from 'react';
import { useSelector} from "react-redux";
import AlbumCard from "../AlbumCard/AlbumCard";
import {useNavigate} from "react-router-dom";
import './Carousel.css';
import '../../App.css';
import TrackCard from "../TrackCard/TrackCard";
import playCircle from '../../assests/play-circle.svg'
import stopCircle from '../../assests/stop-circle.svg'


const Carousel = ({type, flexWrap, button}) => {
    //for new releases
    const albums = useSelector(state => state.musicAppReducer.newRelease.albums);

    //for top 50 tracks
    const topTracks = useSelector(state => state.musicAppReducer.topTracks.tracks);

    // console.log("albums from carousel", albums)
    // console.log("topTracks from carousel", topTracks)
    const navigate = useNavigate();


    const handleViewAll = () => {
        switch (type) {
            case 'New Releases':
                window.scrollTo({top: 0, behavior: 'smooth'}); // Scroll to the top
                navigate('/new-releases');
                break;
            case 'Top 50 Tracks':
                window.scrollTo({top: 0, behavior: 'smooth'}); // Scroll to the top
                navigate('/top-tracks');
                break
            default:
                break;
        }
    }

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

    //pause music when unmounting
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
            }
        };
    }, [currentAudio]);

    return (
        <div className={'carouselContainer'}>
            <h1>{type}</h1>
            <div className={'carouselCards'} style={{flexWrap: `${flexWrap}`}}>
                {type === 'New Releases' && albums.map(album => (
                    <AlbumCard key={album.id} detail={album}/>
                ))}
                {type === 'Top 50 Tracks' && topTracks.map(track => (
                    <TrackCard key={track.track.id} detail={track.track} playMusic={playMusic} icon={track.track.id === currentTrackId ? stopIcon : playIcon}/>
                ))}

            </div>
            {button === 'yes' &&
                <button className={'viewAllBtn'}
                        onClick={handleViewAll}
                        style={{
                            position: "relative",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: "20px"
                        }}>
                    View All
                </button>}
        </div>
    );
};

export default Carousel;