import React, { useEffect, useState } from 'react';

const Home = () => {
    const [accessToken, setAccessToken] = useState(null);

    const fetchToken = async () => {
        try {
            const response = await fetch('http://localhost:3001/token');
            const data = await response.json();
            console.log('Access Token:', data.access_token);
            setAccessToken(data.access_token);
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };

    useEffect(() => {
        // Fetch the access token when the component mounts
        fetchToken();

        // Set an interval to fetch the token every 59 minutes
        const interval = setInterval(fetchToken, 59 * 60 * 1000); // 59 minutes

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Spotify Music App</h1>
            {accessToken && <div>Access token: {accessToken}</div>}
        </div>
    );
};

export default Home;
