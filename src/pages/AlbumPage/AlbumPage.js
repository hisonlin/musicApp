import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { searchAlbum } from '../../actions/actions';
import DetailsTop from '../../components/Details/DetailsTop';
import SerachBar from '../../components/SerachBar/SerachBar';
import DetailsBottom from '../../components/Details/DetailsBottom';
import './AlbumPage.css'


const AlbumPage = () => {
    const params = useParams();
    const albumID = params.id;

    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    const album = useSelector(state => state.musicAppReducer.searchResults.album);
    console.log('Album:', album);

    const dispatch = useDispatch();


    useEffect(() => {
        if (accessToken) {
            dispatch(searchAlbum(accessToken, albumID));
        }
    }, [accessToken]);

    return (
        <div>
            <SerachBar />
            <div className='details'>
                {album && <DetailsTop album={album} />}
                {album && <DetailsBottom album={album} />} 
            </div>


        </div>
    )
}

export default AlbumPage
