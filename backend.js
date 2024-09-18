require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');

const app = express();
const port = 3001;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Enable CORS
//allow you to make request from the frontend to the backend, means from fronted Port 3000 to backend Port 3001
app.use(cors());

// Endpoint to get access token using Client Credentials flow
app.get('/token', async (req, res) => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    try {
        const response = await axios.post(tokenUrl, querystring.stringify({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token, token_type, expires_in } = response.data;
        // console.log('Access Token:', access_token);

        res.json({ access_token, token_type, expires_in });
    } catch (error) {
        console.error('Error fetching access token:', error); // Debug log
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
