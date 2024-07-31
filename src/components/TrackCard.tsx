import Image from 'next/image';
import { GetTime } from '../app/lib/utils';
import { useMusicSearchStore, useSongBar } from '../app/stores/musicStore';
import { YoutubeSearch } from '../app/lib/youtube';
export default function TrackCard(track: any) {
    const { searchTerm, setDataVideo, setDataSpoty } = useMusicSearchStore(
        (state: any) => state
    );
    const { playing, setPlaying } = useSongBar((state: any) => state);

    const handleSearch = async () => {
        const response = await YoutubeSearch(
            `${track.track.name as string} lyrics${
                track.track.artists[0].name as string
            }`
        );
        console.log(response);
        setDataVideo(response);
        setDataSpoty(track.track);
        setPlaying(true);
    };

    //console.log('Track:', track);
    return (
        <button
            onClick={handleSearch}
            key={track.track.id}
            className="flex h-24 hover:h-32 group gap-4 opacity-50 w-fit pr-8 hover:opacity-100 items-center transition-all duration-500 ease-in-out">
            <Image
                src={track.track.album?.images[0].url}
                alt={track.track.name}
                width={52}
                height={52}
                style={{ width: 'auto', height: 'auto' }}
                draggable={false}
                loading="lazy"
                decoding="async"
                className=" rounded-lg"
            />
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
