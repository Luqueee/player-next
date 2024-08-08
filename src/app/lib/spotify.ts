'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getAccessToken = async () => {
    const access_token = cookies().get('access_token');
    return access_token;
};

export const removeAccesToken = async () => {
    cookies().delete('access_token');
};

export const refreshToken = async () => {
    const response = await fetch('https://open.spotify.com/get_access_token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const data = await response.json();
    console.log('Creating Access Token:', data);
    cookies().set('access_token', data.accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
    return data;
};

export async function searchSong(query: string) {
    const access_token = await getAccessToken();
    console.log('reading access token:', access_token);

    // Your client-side search logic
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${access_token?.value}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status == 401) {
                refreshToken();
                return searchSong(query);
            }
            console.error('Axios error response:', error.response?.data);
            console.error('Request config:', error.config);
        } else {
            console.error('Error searching for song:', error);
        }
        throw error;
    }
}
