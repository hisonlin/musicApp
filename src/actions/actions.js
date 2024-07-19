import {FETCH_TOKEN_FAILURE, FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS} from "../const";

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