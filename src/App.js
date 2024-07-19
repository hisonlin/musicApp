import React, {useEffect} from 'react';
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken} from "./actions/actions";

const App = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    console.log('From App', accessToken);

    useEffect(() => {
        dispatch(fetchToken());
    }, [dispatch]);

    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
        </div>
    );
};

export default App;

