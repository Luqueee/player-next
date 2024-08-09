import Image from 'next/image';
import { GetTime } from '../app/lib/utils';
import { Suspense, useEffect } from 'react';
import FallBackImage from './skeletons/FallBackImageTrack';
import { useMusicSearchStore, useSongBar } from '../app/stores/musicStore';
import { YoutubeSearch } from '../app/lib/youtube';

export default function TrackCardYoutube(track: any) {
    const { setCurrentTime, setDataVideo, setIndexSong, setDataSpoty } =
        useMusicSearchStore((state: any) => state);
    const { playing, setPlaying } = useSongBar((state: any) => state);

    //console.log('Track:', track.track.album?.images[0].url);
    return (
        <div>
            {track.track?.contents?.map((element: any, index: number) => {
                return (
                    console.log('Track:', element),
                    (<p key={index}>{element.name}</p>)
                );
            })}
        </div>
    );
}
