import React from 'react';
import {useSelector} from "react-redux";
import AlbumCard from "../AlbumCard/AlbumCard";
import {useNavigate} from "react-router-dom";
import './Carousel.css';
import '../../App.css';
import TrackCard from "../TrackCard/TrackCard";

const Carousel = ({type, flexWrap, button}) => {
    //for new releases
    const albums = useSelector(state => state.musicAppReducer.newRelease.albums);
    const topTracks = useSelector(state => state.musicAppReducer.topTracks);
    console.log("albums from carousel", albums)
    console.log("topTracks from carousel", topTracks)
    const navigate = useNavigate();

    const handleViewAll = () => {
        switch (type) {
            case 'New Releases':
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
                navigate('/new-releases');
                break;
            case 'Top 50 Tracks':
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
                navigate('/top-tracks');
                break
            default:
                break;
        }
    }

    return (
        <div className={'carouselContainer'}>
            <h1>{type}</h1>
            <div className={'carouselCards'} style={{flexWrap: `${flexWrap}`}}>
                {type === 'New Releases' && albums.map(album => (
                    <AlbumCard key={album.id} detail={album}/>
                ))}
                {type === 'Top 50 Tracks' && topTracks.map(track => (
                    <TrackCard key={track.track.id} detail={track.track}/>
                ))}

            </div>
            {button === 'yes' &&
                <button className={'viewAllBtn'}
                        onClick={handleViewAll}
                        style={{
                            position: "relative",
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}>
                    View All
                </button>}
        </div>
    );
};

export default Carousel;