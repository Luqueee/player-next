'use client';
import { useSearch, useSearchYoutube } from '@/app/hooks/hooks';
import { useDebounce } from '@/app/hooks/hooks';
import { useMusicSearchStore } from '@/app/stores/musicStore';
import { useState, useRef } from 'react';
import Image from 'next/image';
import TrackCardYoutube from '../components/TrackCardYoutube';
import TrackCard from '@/components/TrackCard';
import ArstistCard from '@/components/ArtistCard';
import { getAccessToken, removeAccesToken } from './lib/spotify';

import { redirect } from 'next/navigation';

//TODO: Hacer que cada boton tenga un handler que haga un fetch a la api de youtube y devuelva el video de la cancion
//TODO: Hacer un middleware para refrescar el access token de spotify :)

export default function Home() {
    const { searchTerm, setSearchTerm, searching, setSearching } =
        useMusicSearchStore((state: any) => state);

    //const { results, handleSearch } = useSearchYoutube();
    const { results, handleSearch } = useSearch();

    const [term, setTerm] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchDebounced = useDebounce(() => {
        handleSearch();
    }, 200);

    const handleInputFocus = () => {
        if (searching == false) {
            setSearching(true);
        }
    };

    const handleInputBlur = () => {
        if (searching == true) {
            setSearching(false);
        }
    };

    const handleInput = (e: any) => {
        e.preventDefault();
        console.log('Searching for:', e.target.value);
        setTerm(e.target.value);
        setSearchTerm(e.target.value);
        handleSearchDebounced();
    };

    return (
        <div
            className="min-w-[70%] max-h-[90vh] relative z-50 mx-auto flex justify-between py-4 gap-8 items-start flex-col-reverse md:lg:flex-row flex-nowrap overflow-hidden"
            style={{}}>
            <Image
                src={'/images/bg.webp'}
                alt="bg"
                draggable={false}
                priority
                quality={100}
                decoding="async"
                loading="eager"
                fill
                style={{
                    width: '100%',
                    height: '100%',
                    maskImage:
                        'linear-gradient(to top, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 70%)',
                }}
                className="object-cover w-full rounded-lg fixed opacity-50 inset-0 blur-sm -z-10"
            />
            <div
                id="searchResult"
                className=" flex p-4 justify-between md:lg:w-[50%] overflow-hidden  pl-8 md:lg:pt-0 max-h-[90vh] min-h-[90vh] scroll-smooth flex-col gap-4"
                style={{
                    maskImage:
                        'linear-gradient(to top, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 100%, ',
                }}>
                <div className=" flex-grow pt-4 z-[99999999]">
                    <input
                        type="text"
                        ref={inputRef}
                        value={term}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder="Search for a song..."
                        onChange={handleInput}
                        className=" ring-none border-none outline-none p-2 w-full h-16 text-2xl antialiased bg-opacity-20 bg-zinc-900/50 backdrop-blur-sm ring-0 ring-zinc-900/70 focus:ring-4 hover:ring-1 transition-all duration-500 text-white rounded-xl border-0 shadow-primary"
                    />
                </div>

                <div
                    id="track_songs"
                    className=" max-h-[90vh] pb-96 overflow-y-scroll">
                    {
                        //results?.map((element: any, index: number) => {
                        // <TrackCardYoutube key={index} track={element} />;
                        //})
                    }
                    {results?.tracks?.items.map((track: any) => (
                        <TrackCard key={track.id} track={track} />
                    ))}
                    {results?.artists?.items.map((artist: any) => (
                        //console.log('Artist:', artist),
                        <ArstistCard key={artist.id} track={artist} />
                    ))}
                </div>
            </div>
        </div>
    );
}
