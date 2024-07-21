import React, {useEffect} from 'react';
import './NewReleasesPage.css'
import Carousel from "../../components/Carousel/Carousel";
import {useDispatch, useSelector} from "react-redux";
import {getNewReleases} from "../../actions/actions";
import '../../App.css'

const NewReleasesPage = () => {
    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    const total = useSelector(state => state.musicAppReducer.newRelease.total);
    const offset = useSelector(state => state.musicAppReducer.newRelease.offset);
    const albums = useSelector(state => state.musicAppReducer.newRelease.albums);

    const dispatch=useDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getNewReleases(accessToken, 50, 0));
        }
    }, [accessToken]);

    const handleButton = (type) => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top

        setTimeout(() => {
            switch (type) {
                case 'Previous':
                    if (offset > 0) {
                        dispatch(getNewReleases(accessToken, 50, offset - 50));
                    }
                    break;
                case 'Next':
                    if (offset < total - 50) {
                        dispatch(getNewReleases(accessToken, 50, offset + 50));
                    }
                    break;
                default:
                    break;
            }
        }, 500); // Adjust the delay as needed
    };

    if(albums.length===0){
        return null;
    }

    return (
        <div style={{margin:"20px"}} >
            <Carousel type={'New Releases'} flexWrap={'wrap'} button={'no'} item={'albums'}/>
            <div className={'btnList'}>
                <button className={'viewAllBtn'} onClick={() => handleButton('Previous')} disabled={offset <= 0}>Previous</button>
                <button className={'viewAllBtn'} onClick={() => handleButton('Next')} disabled={offset >= total - 50}>Next</button>
            </div>
        </div>
    );
};

export default NewReleasesPage;