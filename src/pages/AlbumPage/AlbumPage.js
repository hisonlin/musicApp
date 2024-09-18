import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { searchAlbum } from '../../actions/actions';

const AlbumPage = () => {
    const params = useParams();
    const albumID = params.id;

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    const album = useSelector(state => state.musicAppReducer.searchResults.album);
    console.log('Album:', album);

    useEffect(() => {
        if (accessToken) {
            dispatch(searchAlbum(accessToken, albumID));
        }
    }, [dispatch, accessToken, albumID]);

    return (
        <div>
            <h1>{albumID}</h1>
        </div>
    )
}

export default AlbumPage
