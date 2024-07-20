import {
    FETCH_NEW_RELEASES_FAILURE,
    FETCH_NEW_RELEASES_REQUEST,
    FETCH_NEW_RELEASES_SUCCESS,
    FETCH_TOKEN_FAILURE,
    FETCH_TOKEN_REQUEST,
    FETCH_TOKEN_SUCCESS, SET_NEW_RELEASES_OFFSET
} from "../const";

const initialState = {
    accessToken: '',
    loading: false,
    error: '',
    newRelease: {
        albums: [],
        total: 0,
        offset: 0
    },
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
        case FETCH_NEW_RELEASES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_NEW_RELEASES_SUCCESS:
            return {
                ...state,
                loading: false,
                newRelease: {
                    albums: action.data,
                    total: action.total,
                    offset: action.offset
                }
            };
        case FETCH_NEW_RELEASES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_NEW_RELEASES_OFFSET:
            return {
                ...state,
                newReleaseOffset: action.payload
            };
        default:
            return state;
    }
}
