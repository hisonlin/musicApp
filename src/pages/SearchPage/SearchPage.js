import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import './SearchPage.css';
import SearchResultCard from '../../components/SearchResultCard/SearchResultCard';
import SerachBar from '../../components/SerachBar/SerachBar';
import { search } from '../../actions/actions';


const SearchPage = () => {
    const params = useParams();

    const accessToken = useSelector(state => state.musicAppReducer.accessToken);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(search(accessToken, params.input));
    }, [dispatch, accessToken, params.input]);

    const searchResults = useSelector(state => state.musicAppReducer.searchResults);
    console.log('searchResults', searchResults);
    const { tracks = [], artists = [] } = searchResults; // Ensure tracks and artists are arrays
    console.log('tracks', tracks);
    console.log('artists', artists);

    return (
        <div>
            <SerachBar />
            <div className="search-title">
                {tracks.length > 0 || artists.length > 0 ? (
                    <h1>Search Results for "{params.input}"...</h1>
                ) : (
                    <h1>No results found for "{params.input}"</h1>
                )}
            </div>

            {tracks.length > 0 && (
                <section className="tracks-results">
                    <h2>Tracks</h2>
                    <div className="results-card">
                    {tracks.map(track => (
                        <SearchResultCard key={track.id} results={track} type="tracks" />
                    ))}
                    </div>
                </section>
            )}

            {artists.length > 0 && (
                <section className="artists-results">
                    <h2>Artists</h2>
                    <div className="results-card">
                    {artists.map(artist => (
                        <SearchResultCard key={artist.id} results={artist} type="artists" />
                    ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SearchPage;
