import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const useMusicSearchStore = create(
    persist(
        (set) => ({
            searchTerm: '',
            dataVideo: {},
            dataSpoty: {},
            currentTime: 0,
            duration: 0,
            volume: 1,
            indexSong: 1,
            setVolume: (volume: any) => set({ volume }),
            setDataSpoty: (dataSpoty: any) => set({ dataSpoty }),
            setSearchTerm: (searchTerm: any) => set({ searchTerm }),
            setCurrentTime: (currentTime: any) => set({ currentTime }),
            setDataVideo: (dataVideo: any) => set({ dataVideo }),
            setDuration: (duration: any) => set({ duration }),
            setIndexSong: (indexSong: number) => set({ indexSong }),
        }),
        {
            name: 'music-search',
            version: 1,
        }
    )
);

export { useMusicSearchStore };

const useSongBar = create((set) => ({
    playing: false,

    setPlaying: (playing: any) => set({ playing }),
}));

export { useSongBar };
