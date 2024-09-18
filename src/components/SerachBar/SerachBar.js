import React from 'react'
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import {useSelector, useDispatch} from 'react-redux';
import {search} from '../../actions/actions';
import {useNavigate} from 'react-router-dom';

const SerachBar = () => {

    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target[0].value;
        
        navigate(`/search/${query}`);

        // Clear the input field
        e.target[0].value = '';
    }
    return (
        <div className='searchBarContainer'>
            <form action='/search' className="searchBar" onSubmit={handleSearch}>
                <input type="text"
                placeholder='Search...'/>
                <SearchIcon className="searchIcon" />
            </form>


        </div>
    )
}

export default SerachBar
