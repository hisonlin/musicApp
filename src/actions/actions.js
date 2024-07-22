import {
    FETCH_FAILURE,
    FETCH_NEW_RELEASES_SUCCESS,
    FETCH_REQUEST,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOP_TRACKS_SUCCESS,
} from "../const";
import axios from "axios";

const fetchRequest = () => ({
    type: FETCH_REQUEST
});

const fetchTokenSuccess = (token) => ({
    type: FETCH_TOKEN_SUCCESS,
    payload: token
});

const fetchFailure = (error) => ({
    type: FETCH_FAILURE,
    payload: error
});


export const fetchToken = () => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await fetch('http://localhost:3001/token');
            const data = await response.json();
            dispatch(fetchTokenSuccess(data.access_token));
        } catch (error) {
            dispatch(fetchFailure(error.toString()));
        }
    };
};

const fetchNewReleasesSuccess = (data, total, offset) => ({
    type: FETCH_NEW_RELEASES_SUCCESS,
    data,
    total,
    offset
});


export const getNewReleases =  (accessToken, limit,offset) => {
    return async (dispatch)=>{
    dispatch(fetchRequest());
    try {
        const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept-Language': 'en'
            },
            params: {
                limit: limit,
                offset: offset
            }
        });
        const data = response.data;
        console.log('New Releases', data);
        const total = data.albums.total;
        dispatch(fetchNewReleasesSuccess(data.albums.items, total, offset));

    } catch (error) {
        console.error('Error fetching new releases:', error);
        dispatch(fetchFailure(error.toString()));
    }
}};

export const fetchTopTracksSuccess=(data, total, offset)=>({
    type: FETCH_TOP_TRACKS_SUCCESS,
    data,
    total,
    offset
});

export const getTopTracks = (accessToken, limit, offset) => {
    const playlistId = '37i9dQZEVXbMDoHDwVN2tF'; // Top 50 - Global playlist ID
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': 'en'
                },
                params: {
                    limit: limit,
                    offset: offset
                }
            });
            const data = response.data;
            console.log('Top Tracks', data);
            const total = data.total;
            dispatch(fetchTopTracksSuccess(data.items,total,offset));

        } catch (error) {
            console.error('Error fetching top tracks:', error);
            dispatch(fetchFailure(error.toString()));
        }
    };
}