import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTopTracks} from "../../actions/actions";
import Carousel from "../../components/Carousel/Carousel";

const TopTracksPage = () => {

    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    const topTracks = useSelector(state => state.musicAppReducer.topTracks.tracks);

    console.log("topTracks from page", topTracks)
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getTopTracks(accessToken, 50, 0));
        }
    }, [accessToken]);

    if (topTracks.length === 0) {
        return null;
    }

    return (
        <div style={{margin: "20px"}}>
            <Carousel type={'Top 50 Tracks'} flexWrap={'wrap'} button={'no'} />
        </div>
    );
};

export default TopTracksPage;