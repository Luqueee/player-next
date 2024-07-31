// src/app/lib/spotifyServer.ts
import axios from 'axios';
import { cookies } from 'next/headers';

export const getTokens = async (code: string) => {
    const cookieStore = cookies();
    // Your logic using cookies
    return axios.post(
        'https://accounts.spotify.com/api/token'
        // Your request payload
    );
};
