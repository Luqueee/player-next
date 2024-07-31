import axios from 'axios';

export const search = async (query: string) => {
    // Your client-side search logic
    return axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`);
};
