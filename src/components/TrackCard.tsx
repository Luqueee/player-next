import Image from 'next/image';
import { GetTime } from '../app/lib/utils';
import { Suspense } from 'react';
import FallBackImage from './skeletons/FallBackImageTrack';
import { useMusicSearchStore, useSongBar } from '../app/stores/musicStore';
import { YoutubeSearch } from '../app/lib/youtube';

export default function TrackCard(track: any) {
    const { setCurrentTime, setDataVideo, setIndexSong, setDataSpoty } =
        useMusicSearchStore((state: any) => state);
    const { playing, setPlaying } = useSongBar((state: any) => state);

    const handleSearch = async () => {
        try {
            console.log('Searching for:', track.track);
            const searchQuery = `${track.track.name as string} ${
                track.track.artists[0].name as string
            } lyrics`;

            const response = await YoutubeSearch(searchQuery);
            console.log('Youtube data:', response);
            //setDataVideo(response.data);
            console.log('Track:', track);
            setDataVideo(response);
            // Ensure track.track is a plain object
            const plainTrack = JSON.parse(JSON.stringify(track.track));

            setIndexSong(0);
            setCurrentTime(0);
            setDataSpoty(plainTrack);
            setTimeout(() => {
                setPlaying(true);
            }, 100);
        } catch (error) {
            console.error(error);
        }
    };

    //console.log('Track:', track.track.album?.images[0].url);
    return (
        <button
            onClick={handleSearch}
            key={track.track.id}
            className="flex min-h-20 group gap-4 opacity-80 md:lg:w-fit md:lg:pr-8 pr-0 w-full hover:opacity-100 items-center transition-all duration-500 ease-in-out">
            <Suspense fallback={<FallBackImage />}>
                {track.track.album.images.length >= 1 ? (
                    <Image
                        src={track.track.album?.images[0].url ?? ''}
                        alt={track.track.name}
                        width={52}
                        height={52}
                        style={{ width: '62px', height: '62px' }}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        className="rounded-lg"
                    />
                ) : (
                    <FallBackImage />
                )}
            </Suspense>
            <div className=" flex gap-4 justify-center flex-col transition-all duration-500 ease-in-out">
                <p className=" text-start text-md line-clamp-2 md:lg:text-2xl font-bold text-balance">
                    {track.track.name}
                </p>
                <div className=" flex gap-4 text-sm md:lg:text-md">
                    <span className=" flex gap-1">
                        <span className=" font-bold">
                            {GetTime(track.track.duration_ms)}
                        </span>
                        -<span>{track.track.artists[0].name}</span>
                    </span>
                </div>
            </div>
        </button>
    );
}
