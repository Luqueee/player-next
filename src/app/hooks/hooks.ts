'use client';
import { useEffect, useRef, useState } from 'react';
import { useMusicSearchStore } from '@/app/stores/musicStore';
import axios from 'axios';
import { refreshToken } from '../lib/spotify';

export const useDebounce = (callback: any, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Cleanup the previous timeout on re-render
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedCallback = (...args: any) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
};

export const useSearch = () => {
    const { searchTerm, setDataVideo } = useMusicSearchStore(
        (state: any) => state
    );
    const [results, setResults] = useState<any>(null);

    const search = async (searchTerm: string) => {
        try {
            const response = await axios.get('/api/spotify/search', {
                params: { song: searchTerm },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                refreshToken();
                console.error('Axios error response:', error.response?.data);
                console.error('Request config:', error.config);
            } else {
                console.error('Error searching for song:', error);
            }
            throw error;
        }
    };

    const handleSearch = async () => {
        try {
            const data = await search(searchTerm);

            console.log(data);
            setResults(data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return { results, handleSearch };
};
