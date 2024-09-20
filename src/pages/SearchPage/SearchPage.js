import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import './SearchPage.css';
import SearchResultCard from '../../components/SearchResultCard/SearchResultCard';
import SerachBar from '../../components/SerachBar/SerachBar';
import { search } from '../../actions/actions';
import playCircle from '../../assests/play-circle.svg'
import stopCircle from '../../assests/stop-circle.svg'


const SearchPage = () => {
    const params = useParams();

    const accessToken = useSelector(state => state.musicAppReducer.accessToken);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(search(accessToken, params.input));
    }, [dispatch, accessToken, params.input]);

    const searchResults = useSelector(state => state.musicAppReducer.searchResults);
    // console.log('searchResults', searchResults);
    const { tracks = [], artists = [] } = searchResults; // Ensure tracks and artists are arrays
    console.log('tracks', tracks);
    // console.log('artists', artists);

    
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
        <div>
            <SerachBar />
            <div className="search-title">
                {tracks.length > 0 || artists.length > 0 ? (
                    <h1>Search Results for "{params.input}"...</h1>
                ) : (
                    <h1>No results found for "{params.input}"</h1>
                )}
            </div>

            {tracks.length > 0 && (
                <section className="tracks-results">
                    <h2>Tracks</h2>
                    <div className="results-card">
                    {tracks.map(track => (
                        <SearchResultCard key={track.id} results={track} type="tracks" playMusic={playMusic} 
                        icon={track.id === currentTrackId ? stopIcon : playIcon}/>
                    ))}
                    </div>
                </section>
            )}

            {artists.length > 0 && (
                <section className="artists-results">
                    <h2>Artists</h2>
                    <div className="results-card">
                    {artists.map(artist => (
                        <SearchResultCard key={artist.id} results={artist} type="artists" />
                    ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SearchPage;
