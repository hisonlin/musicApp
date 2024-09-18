import {
    FETCH_FAILURE,
    FETCH_NEW_RELEASES_SUCCESS,
    FETCH_REQUEST,
    FETCH_TOKEN_SUCCESS,
    FETCH_TOP_TRACKS_SUCCESS,
    FETCH_SEARCH_SUCCESS,
    SEARCH_ALBUM_SUCCESS
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


export const getNewReleases = (accessToken, limit, offset) => {
    return async (dispatch) => {
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
    }
};

export const fetchTopTracksSuccess = (data, total, offset) => ({
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
            dispatch(fetchTopTracksSuccess(data.items, total, offset));

        } catch (error) {
            console.error('Error fetching top tracks:', error);
            dispatch(fetchFailure(error.toString()));
        }
    };
}

export const fetchSearchSuccess = (tracks, artists, totalTracks, totalArtists, offset) => ({
    type: FETCH_SEARCH_SUCCESS,
    tracks,
    artists,
    totalTracks,
    totalArtists,
    offset
});

export const search = (accessToken, query) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            // Use Promise.all to fetch both tracks and artists
            const [tracksResponse, artistsResponse] = await Promise.all([
                axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept-Language': 'en'
                    },
                    params: {
                        q: query,
                        type: 'track',
                        limit: 15,
                        offset: 0
                    }
                }),
                axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Accept-Language': 'en'
                    },
                    params: {
                        q: query,
                        type: 'artist',
                        limit: 15,
                        offset: 0
                    }
                })
            ]);

            // Extract data from both responses
            const tracksData = tracksResponse.data.tracks;
            const artistsData = artistsResponse.data.artists;

            // Log responses for debugging
            console.log('Tracks:', tracksData);
            console.log('Artists:', artistsData);

            // Dispatch the combined success action
            dispatch(fetchSearchSuccess(
                tracksData.items,
                artistsData.items,
            ));
        } catch (error) {
            console.error('Error fetching search:', error);
            dispatch(fetchFailure(error.toString()));
        }
    };
}

export const searchAlbumSuccess = (data) => ({
    type: SEARCH_ALBUM_SUCCESS,
    data
});

export const searchAlbum = (accessToken, id) => {
    return async (dispatch) => {
        dispatch(fetchRequest());
        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept-Language': 'en'
                }
            });
            const data = response.data;
            console.log('Album:', data);
            dispatch(searchAlbumSuccess(data));
        } catch (error) {
            console.error('Error fetching album:', error);
            dispatch(fetchFailure(error.toString()));
        }
    };
}