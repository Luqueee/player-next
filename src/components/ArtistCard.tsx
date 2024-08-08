import Image from 'next/image';
import { GetTime } from '../app/lib/utils';
import { Suspense } from 'react';
import FallBackImage from './skeletons/FallBackImageArtist';
import { useMusicSearchStore, useSongBar } from '../app/stores/musicStore';
import { YoutubeSearch } from '../app/lib/youtube';
export default function ArstistCard(artist: any) {
    const { searchTerm, setDataVideo, setDataSpoty } = useMusicSearchStore(
        (state: any) => state
    );
    const { playing, setPlaying } = useSongBar((state: any) => state);

    const handleSearch = async () => {
        // const response = await YoutubeSearch(
        //     `${track.track.name as string} lyrics${
        //         track.track.artists[0].name as string
        //     }`
        // );
        // console.log(response);
        // console.log('Track:', track);
        // setDataVideo(response);
        // setDataSpoty(track.track);
        // setPlaying(true);
        //console.log('Searching for:', artist);
    };

    //console.log('aaaa:', artist);
    return (
        <button
            onClick={handleSearch}
            key={artist.track.id}
            className="flex h-24 group gap-4 opacity-50  md:lg:w-fit md:lg:pr-8 pr-0 w-full hover:opacity-100 items-center transition-all duration-500 ease-in-out">
            <Suspense fallback={<FallBackImage />}>
                {artist.track.images &&
                artist.track.images[0] &&
                artist.track.images[0].url ? (
                    <Image
                        unoptimized
                        src={artist.track.images[0].url}
                        alt={artist.track.name}
                        width={52}
                        height={52}
                        style={{ width: '62px', height: '62px' }}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        className="rounded-full"
                    />
                ) : (
                    <FallBackImage />
                )}
            </Suspense>

            <div className=" flex gap-4 justify-center flex-col transition-all duration-500 ease-in-out">
                <p className=" text-start text-md line-clamp-2 md:lg:text-2xl font-bold text-balance">
                    {artist.track.name}
                </p>
            </div>
        </button>
    );
}
