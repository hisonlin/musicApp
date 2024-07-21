import React, {useEffect} from 'react';
import HomePage from "./pages/Home/HomePage";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchToken} from "./actions/actions";
import NewReleasesPage from "./pages/NewReleases/NewReleasesPage";
import TopTracksPage from "./pages/TopTracksPage/TopTracksPage";

const App = () => {
    const dispatch = useDispatch();
    // const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    // console.log('From App', accessToken);

    useEffect(() => {
        // Fetch the token initially when the component mounts
        dispatch(fetchToken());

        // Set an interval to fetch the token every 59 minutes
        const intervalId = setInterval(() => {
            dispatch(fetchToken());
        }, 59 * 60 * 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/new-releases'} element={<NewReleasesPage/>}/>
                <Route path={'/top-tracks'} element={<TopTracksPage/>}/>
            </Routes>
        </div>
    );
};

export default App;

