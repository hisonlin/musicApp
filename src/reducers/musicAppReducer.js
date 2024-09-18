import {
    FETCH_FAILURE,
    FETCH_NEW_RELEASES_SUCCESS, FETCH_REQUEST,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOP_TRACKS_SUCCESS,
    FETCH_SEARCH_SUCCESS,
    SEARCH_ALBUM_SUCCESS
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
    topTracks: {
        tracks: [],
        total:0,
        offset:0
    },
    searchResults: {
        tracks: [],
        artists: [],
        album: null
    }
}

export const musicAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
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
        case FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
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
        case FETCH_TOP_TRACKS_SUCCESS:
            return {
                ...state,
                topTracks: {
                    tracks: action.data,
                    total: action.total,
                    offset: action.offset
                }
            };
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                searchResults: {
                    tracks: action.tracks,
                    artists: action.artists
                }
            };
            case SEARCH_ALBUM_SUCCESS:
                return {
                    ...state,
                    searchResults: {
                        album: action.data
                    }
                };

        default:
            return state;
    }
}
