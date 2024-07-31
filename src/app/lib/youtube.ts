import { YouTube } from 'youtube-sr';
import axios from 'axios';
export async function YoutubeSearch(title: string) {
    try {
        const response = await axios.get(`/api/youtube/song`, {
            params: { song: title },
        });
        return response.data[0];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error response:', error.response?.data);
            console.error('Request config:', error.config);
        } else {
            console.error('Error searching for song:', error);
        }
        throw error;
    }
}
