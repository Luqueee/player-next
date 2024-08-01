'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const getTokens = async (code: string) =>
    axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
            code,
            redirect_uri: `${process.env.REDIRECT_URI}/api/auth/callback/spotify`,
            grant_type: 'authorization_code',
        }).toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID as string}:${
                        process.env.SPOTIFY_CLIENT_SECRET as string
                    }`
                ).toString('base64')}`,
            },
        }
    );

export const fetchSpotifyTokens = async () => {
    return redirect(
        `https://accounts.spotify.com/authorize?client_id=bec196b7845a4d80b09c4bd4fe7780ec&response_type=code&redirect_uri=${process.env.REDIRECT_URI}/api/auth/callback/spotify&scope=user-read-currently-playing%20user-top-read`
    );
};

export const accessToken = async () => {
    const cookieStore = cookies();

    const access_token = cookieStore.get('access_token');
    const refresh_token = cookieStore.get('refresh_token');
    if (!access_token || !refresh_token) {
        return null;
    }
    return { access_token, refresh_token };
};

export const refreshToken = async () => {
    try {
        const refresh_token = (await accessToken())?.refresh_token.value;
        console.log('refresh_token:', refresh_token);
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token ?? '',
                client_id: process.env.SPOTIFY_CLIENT_ID as string,
            }).toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        console.log('Refresh token response:', response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getReqSpotify = async (url: string) => {
    const access_token = (await accessToken())?.access_token.value;
    console.log('access_token:', access_token);
    const authorizationHeader = access_token ? `Bearer ${access_token}` : '';
    console.log('Authorization Header:', authorizationHeader);

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: authorizationHeader,
            },
        });
        return response.data; // Ensure the response is returned as JSON
    } catch (error) {
        if (axios.isAxiosError(error)) {
            fetchSpotifyTokens();
            console.error('Axios error response:', error.response?.data);
        } else {
            console.error('Error searching for song:', error);
        }
        await refreshToken();
    }
};

export const search = async (songname: string) => {
    try {
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            songname
        )}&type=track%2Cartist`;
        console.log('Request URL:', url);
        return getReqSpotify(url);
    } catch (error) {
        refreshToken();
    }
};
