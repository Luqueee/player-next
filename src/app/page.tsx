'use client';
import { useSearch } from '@/app/hooks/hooks';
import { useDebounce } from '@/app/hooks/hooks';
import { useMusicSearchStore } from '@/app/stores/musicStore';
import { useState, useRef } from 'react';
import TrackCard from '../components/TrackCard';
import { fetchSpotifyTokens } from './lib/spotify';
import { redirect } from 'next/navigation';

//TODO: Hacer que cada boton tenga un handler que haga un fetch a la api de youtube y devuelva el video de la cancion
//TODO: Hacer un middleware para refrescar el access token de spotify :)

export default function Home() {
    const { searchTerm, setSearchTerm } = useMusicSearchStore(
        (state: any) => state
    );

    const { results, handleSearch } = useSearch();

    const [term, setTerm] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchDebounced = useDebounce(() => {
        handleSearch();
    }, 200);

    const handleInput = (e: any) => {
        e.preventDefault();
        console.log('Searching for:', e.target.value);
        setTerm(e.target.value);
        setSearchTerm(e.target.value);
        handleSearchDebounced();
    };

    return (
        <div className="w-[70%] min-h-4 mx-auto flex justify-between py-4 gap-8 items-start flex-col-reverse md:lg:flex-row flex-nowrap">
            <div
                id="searchResult"
                className=" flex md:lg:w-[50%] w-full md:lg:pt-0 py-24  max-h-[100vh] overflow-y-scroll scroll-smooth flex-col gap-4">
                {results?.tracks.items.map((track: any) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </div>
            <div className=" flex md:lg:relative fixed left-4 mx-8 right-4 md:lg:top-16 top-4 flex-grow md:lg:h-full h-fit nd:lg:py-28 py-2 gap-4">
                <input
                    type="text"
                    ref={inputRef}
                    value={term}
                    placeholder="Search for a song..."
                    onChange={handleInput}
                    className=" ring-none border-none outline-none p-2 w-full h-16 text-2xl antialiased bg-opacity-20 bg-zinc-900/50 backdrop-blur-sm ring-0 ring-zinc-900/70 focus:ring-4 hover:ring-1 transition-all duration-500 text-white rounded-xl border-0 shadow-primary"
                />
            </div>
        </div>
    );
}
