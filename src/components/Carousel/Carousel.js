import React from 'react';
import {useSelector} from "react-redux";
import AlbumCard from "../AlbumCard/AlbumCard";
import {useNavigate} from "react-router-dom";
import './Carousel.css';
import '../../App.css';

const Carousel = ({type, flexWrap, button}) => {
    //for new releases
    const albums = useSelector(state => state.musicAppReducer.newRelease.albums);

    const navigate = useNavigate();

    const handleViewAll = () => {
        switch (type) {
            case 'New Releases':
                navigate('/new-releases');
                break;
            default:
                break;
        }

    }

    if (albums.length === 0) {
        return null;
    }

    return (
        <div className={'carouselContainer'}>
            <h1 >{type}</h1>
            <div className={'carouselCards'} style={{flexWrap:`${flexWrap}`}}>
                {albums.map(album => (
                    <AlbumCard key={album.id} album={album}/>
                ))}
            </div>
            {button==='yes'&&<button className={'viewAllBtn'} onClick={handleViewAll} style={{position:"relative", left:"50%", transform:"translateX(-50%)"}}>View All</button>}
        </div>
    );
};

export default Carousel;