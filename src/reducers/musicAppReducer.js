import {FETCH_TOKEN_FAILURE, FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS} from "../const";

const initialState={
    accessToken: '',
    loading: false,
    error: ''
}

export const musicAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.payload
            };
        case FETCH_TOKEN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
