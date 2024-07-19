import { useSelector} from "react-redux";

const Home = () => {
    const accessToken = useSelector(state => state.musicAppReducer.accessToken);
    const loading = useSelector(state => state.musicAppReducer.loading);
    const error = useSelector(state => state.musicAppReducer.error);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {accessToken && <p>Access Token: {accessToken}</p>}
        </div>
    );
};

export default Home;
