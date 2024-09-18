import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNewReleases, getTopTracks} from "../../actions/actions";
import Carousel from "../../components/Carousel/Carousel";
import SerachBar from "../../components/SerachBar/SerachBar";

const HomePage = () => {
    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    const newReleases = useSelector(state => state.musicAppReducer.newRelease.albums);
    const topTracks = useSelector(state => state.musicAppReducer.topTracks.tracks);

    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getNewReleases(accessToken, 50, 0));
            dispatch(getTopTracks(accessToken, 50, 0))
        }
    }, [accessToken]);

    return (
        <div>
            <SerachBar/>
            {newReleases.length > 0 &&<Carousel type={'New Releases'} flexWrap={'nowrap'} button={'yes'}/>}
            {topTracks.length > 0 &&<Carousel type={'Top 50 Tracks'} flexWrap={'nowrap'} button={'yes'}/>}
        </div>
    );
};

export default HomePage;
