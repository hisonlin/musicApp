import {
    FETCH_NEW_RELEASES_FAILURE,
    FETCH_NEW_RELEASES_REQUEST,
    FETCH_NEW_RELEASES_SUCCESS,
    FETCH_TOKEN_FAILURE,
    FETCH_TOKEN_REQUEST,
    FETCH_TOKEN_SUCCESS, SET_NEW_RELEASES_OFFSET
} from "../const";
import axios from "axios";

const fetchTokenRequest = () => ({
    type: FETCH_TOKEN_REQUEST
});

const fetchTokenSuccess = (token) => ({
    type: FETCH_TOKEN_SUCCESS,
    payload: token
});

const fetchTokenFailure = (error) => ({
    type: FETCH_TOKEN_FAILURE,
    payload: error
});


export const fetchToken = () => {
    return async (dispatch) => {
        dispatch(fetchTokenRequest());
        try {
            const response = await fetch('http://localhost:3001/token');
            const data = await response.json();
            dispatch(fetchTokenSuccess(data.access_token));
        } catch (error) {
            dispatch(fetchTokenFailure(error.toString()));
        }
    };
};

const fetchNewReleasesRequest = () => ({
    type: FETCH_NEW_RELEASES_REQUEST
});

const fetchNewReleasesSuccess = (data, total, offset) => ({
    type: FETCH_NEW_RELEASES_SUCCESS,
    data,
    total,
    offset
});

const fetchNewReleasesFailure = (error) => ({
    type: FETCH_NEW_RELEASES_FAILURE,
    payload: error
});


export const getNewReleases =  (accessToken, limit,offset) => {
    return async (dispatch)=>{
    dispatch(fetchNewReleasesRequest());
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
        dispatch(fetchNewReleasesFailure(error.toString()));
    }
}};