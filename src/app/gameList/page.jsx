// Add this at the top of the file to mark the component as a client component
'use client';

import { useState } from 'react';
import axios from 'axios';

const AGENCY_UID = '91fe7789f5c71c2a44f2c81cc6d8c3af';
const AES_KEY = '470b92e4c291dd976cf2234ff2cfd19a';
const PLAYER_PREFIX = 'h78cc6_demo';
const SERVER_URL = 'https://jsgame.live';
const CURRENCY_CODE = 'BDT'; // Set currency code to BDT

// Encrypt function using AES-256-ECB
const encryptData = (data, key) => {
    const crypto = require('crypto');
    const cipher = crypto.createCipheriv('aes-256-ecb', Buffer.from(key, 'hex'), null);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

// Decrypt function using AES-256-ECB
const decryptData = (data, key) => {
    const crypto = require('crypto');
    const decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(key, 'hex'), null);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Function to make API requests
const makeApiRequest = async (url, payload) => {
    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error making API request:', error);
        return null;
    }
};

const getGameUrlSeamless = async (memberAccount, gameUid, creditAmount) => {
    const payload = {
        agency_uid: AGENCY_UID,
        member_account: PLAYER_PREFIX + memberAccount,
        game_uid: gameUid,
        credit_amount: creditAmount,
        currency_code: CURRENCY_CODE,
        timestamp: Math.floor(Date.now() / 1000),
    };

    const encryptedPayload = encryptData(JSON.stringify(payload), AES_KEY);
    const apiResponse = await makeApiRequest(SERVER_URL + '/game/v1', {
        agency_uid: AGENCY_UID,
        timestamp: payload.timestamp,
        payload: encryptedPayload,
    });

    console.log("API Response:", apiResponse);  // Log the full response

    if (apiResponse?.payload) {
        if (typeof apiResponse.payload === 'string') {
            apiResponse.payload = JSON.parse(decryptData(apiResponse.payload, AES_KEY));
        }
    }
    return apiResponse;
};

const GamePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const games = [
        { uid: 'e3b71c6844eb8c30f5ef210ad92725a6', name: 'Adventure Quest', image: 'https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Plinko.png' },
        { uid: 'a7d12c8899ab4c72f8dc7290b1e7a0c1', name: 'Fantasy World', image: 'fantasy.jpg' },
        { uid: 'b2e9128834dc4e45a7d3b90f8f8d92a2', name: 'Speed Racer', image: 'speedracer.jpg' },
    ];

    const handlePlayNow = async (gameUid) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getGameUrlSeamless('Demo', gameUid, '1000');
            console.log("API Response:", response);  // Log the response

            if (response?.payload?.game_launch_url) {
                window.location.href = response.payload.game_launch_url;
            } else {
                console.error('No game_launch_url found in response');
                setError('Failed to retrieve game URL.');
            }
        } catch (err) {
            console.error('Error fetching the game URL:', err);  // Log the error
            setError('An error occurred while fetching the game URL.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
            {games.map((game) => (
                <div key={game.uid} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s' }}>
                    <img src={game.image} alt={game.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '15px', textAlign: 'center' }}>
                        <h3>{game.name}</h3>
                        <button
                            onClick={() => handlePlayNow(game.uid)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Play Now'}
                        </button>
                    </div>
                </div>
            ))}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
};

export default GamePage;
