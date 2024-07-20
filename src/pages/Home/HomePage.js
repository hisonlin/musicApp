import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getNewReleases} from "../../actions/actions";
import Carousel from "../../components/Carousel/Carousel";

const HomePage = () => {
    const accessToken = useSelector(state => state.musicAppReducer.accessToken);

    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getNewReleases(accessToken, 50, 0));
        }
    }, [accessToken]);

    return (
        <div>
           <Carousel type={'New Releases'} flexWrap={'nowrap'} button={'yes'}/>
        </div>
    );
};

export default HomePage;
