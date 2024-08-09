'use client';
import { useEffect, useRef, useState } from 'react';
import { useMusicSearchStore } from '@/app/stores/musicStore';
import { searchSong } from '../lib/spotify';
import { searchYoutubeSong } from '../lib/youtube';
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
        const response = await searchSong(searchTerm);
        return response;
    };

    const handleSearch = async () => {
        try {
            const data = await search(searchTerm);
            console.log('data', data);
            setResults(data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return { results, handleSearch };
};

export const useSearchYoutube = () => {
    const { searchTerm, setDataVideo } = useMusicSearchStore(
        (state: any) => state
    );
    const [results, setResults] = useState<any>(null);

    const handleSearch = async () => {
        try {
            const data = await searchYoutubeSong(searchTerm);

            const contents = data.data.contents;
            const contents_res = contents.splice(1, contents.length - 1);

            setResults(contents_res);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return { results, handleSearch };
};
