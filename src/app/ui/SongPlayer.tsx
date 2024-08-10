/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { use } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useMusicSearchStore, useSongBar } from '../stores/musicStore';
import { Slider } from '@/components/ui/slider';
import { config } from 'process';
export const Play = ({ className = '' }: { className?: string }) => (
    <svg
        className={className ?? ''}
        role="img"
        height="16"
        width="16"
        aria-hidden="true"
        viewBox="0 0 16 16">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
    </svg>
);

export const Pause = ({ className = '' }: { className?: string }) => (
    <svg
        className={className ?? ''}
        role="img"
        height="16"
        width="16"
        aria-hidden="true"
        viewBox="0 0 16 16">
        <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
    </svg>
);

export const VolumeSilence = () => (
    <svg
        fill="currentColor"
        role="presentation"
        height="16"
        width="16"
        aria-hidden="true"
        aria-label="Volumen apagado"
        viewBox="0 0 16 16">
        <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
        <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
    </svg>
);

export const Volume = () => (
    <svg
        fill="currentColor"
        role="presentation"
        height="16"
        width="16"
        aria-hidden="true"
        aria-label="Volumen alto"
        id="volume-icon"
        viewBox="0 0 16 16">
        <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
        <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
    </svg>
);

export const Next = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M15 16l4 -4" />
        <path d="M15 8l4 4" />
    </svg>
);

export const Previous = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l14 0" />
        <path d="M5 12l4 4" />
        <path d="M5 12l4 -4" />
    </svg>
);

const VolumeControl = () => {
    // ...

    const volume = useMusicSearchStore((state: any) => state.volume);
    const setVolume = useMusicSearchStore((state: any) => state.setVolume);
    const previousVolumeRef = useRef(volume);

    const isVolumeSilenced = volume < 0.1;

    const handleClickVolumen = () => {
        if (isVolumeSilenced) {
            setVolume(previousVolumeRef.current);
        } else {
            previousVolumeRef.current = volume;
            setVolume(0);
        }
    };

    return (
        <div className="flex justify-center items-center h-full gap-x-2 text-white">
            <button
                className="opacity-70 hover:opacity-100 transition"
                onClick={handleClickVolumen}>
                {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
            </button>

            <Slider
                defaultValue={[100]}
                max={100}
                min={0}
                value={[volume * 100]}
                className="w-[50px] md:lg:w-[80px] py-2"
                onValueChange={(value) => {
                    const [newVolume] = value;
                    const volumeValue = newVolume / 100;
                    setVolume(volumeValue);
                }}
            />
        </div>
    );
};

const SongControl = ({ audio }: { audio: any }) => {
    const { currentTime, setCurrentTime } = useMusicSearchStore(
        (state: any) => state
    );

    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(audio.current.currentTime);
        };

        audio.current.addEventListener('timeupdate', handleTimeUpdate);

        const interval = setInterval(() => {
            setCurrentTime(audio.current.currentTime);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [audio, setCurrentTime]);

    const formatTime = (time: GLfloat) => {
        if (time == null) return `0:00`;

        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const duration = audio?.current?.duration ?? 0;

    return (
        <div className="flex gap-x-3 text-xs md:lg:justify-start justify-center">
            <span className="opacity-50 w-12 text-right">
                {formatTime(currentTime)}
            </span>

            <Slider
                value={[currentTime]}
                max={audio?.current?.duration ?? 0}
                min={0}
                className="md:lg:w-[200px] w-[100px] h-2 py-2"
                onValueChange={(value) => {
                    const [newCurrentTime] = value;
                    audio.current.currentTime = newCurrentTime;
                    currentTime;
                }}
            />

            <span className="opacity-50 w-12">
                {duration ? formatTime(duration) : '0:00'}
            </span>
        </div>
    );
};

const CurrentSong = ({
    image,
    id,
    title,
    artists,
}: {
    image: string;
    id: string;
    title: string;
    artists: { name: string }[]; // Assuming artists is an array of objects with a name property
}) => {
    const handleClick = () => {
        window.location.href = `https://open.spotify.com/intl-es/track/${id}`;
    };

    // Convert artists array to a string of names
    const artistNames = Array.isArray(artists)
        ? artists.map((artist) => artist.name).join(', ')
        : artists;

    return (
        <button
            onClick={handleClick}
            className={` items-center justify-center group my-auto hidden md:lg:flex gap-4 w-fit z-[999999]`}>
            {image ? (
                <picture className="w-16 h-16 mb-2 bg-zinc-800 rounded-md shadow-lg overflow-hidden object-cover">
                    <img
                        src={image}
                        className="object-cover h-full group-hover:scale-110 transition-all duration-500 w-full"
                        alt={title}
                        decoding="async"
                        loading="eager"
                    />
                </picture>
            ) : (
                <div className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden"></div>
            )}

            <div className="flex flex-col justify-center gap-2 h-full z-50">
                <a
                    target="_blank"
                    href={`https://open.spotify.com/intl-es/track/${id}`}
                    className="font-semibold text-sm line-clamp-2 block hover:underline text-start transition-all">
                    <p>{title}</p>
                </a>
                <span className="text-xs line-clamp-1 text-start opacity-80">
                    {artistNames}
                </span>
            </div>
        </button>
    );
};
export default function SongPlayer() {
    const {
        dataVideo,
        volume,
        dataSpoty,
        searching,
        indexSong,
        setIndexSong,
        currentTime,
        setCurrentTime,
    } = useMusicSearchStore((state: any) => state);
    const { playing, setPlaying } = useSongBar((state: any) => state);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!playing) {
            audioRef.current!.pause();
        } else {
            audioRef
                .current!.play()
                .catch((error) =>
                    console.error('Error playing the audio:', error.message)
                );
        }
    }, [playing]);

    // useEffect(() => {
    //     window.addEventListener('beforeunload', setIsPlayingBar(false));
    //     return () => {
    //         window.removeEventListener('beforeunload', setIsPlayingBar(false));
    //     };
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current!.ended) {
                setPlaying(false);
                audioRef.current!.currentTime = 0;
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [audioRef, setPlaying]);

    useEffect(() => {
        const configMusicInitial = () => {
            const url = dataVideo.url;
            audioRef.current!.volume = volume;

            //console.log(volume);
            //console.log(song_data);
            try {
                if (url) {
                    //console.log('new', currentMusic, previousID);
                    audioRef.current!.src = url; // Change the source
                    audioRef.current!.load(); // Load the new source
                    audioRef.current!.currentTime = currentTime;
                    if (playing) {
                        try {
                            audioRef.current!.play().catch(() =>
                                // Play if it was playing before
                                console.error('el audio no se pudo reproducir:')
                            );
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading audio:', error);
            }
        };

        configMusicInitial();
    }, [dataVideo]);

    useEffect(() => {
        const togglePlayPause = (event: any) => {
            if (event.keyCode === 32 && searching == false) {
                //console.log(searching);
                // 32 es el código de la tecla de espacio
                event.preventDefault();
                setPlaying(!playing); // Alternar entre pausa y reproducción
            }
        };

        // Agregar el escuchador de eventos
        document.addEventListener('keydown', togglePlayPause);

        // Limpiar el escuchador al desmontar el componente
        return () => {
            document.removeEventListener('keydown', togglePlayPause);
        };
    }, [playing, searching, setPlaying]); // Dependencias del efecto

    useEffect(() => {
        audioRef.current!.volume = volume;
    }, [volume]);

    const handleClick = () => {
        setPlaying(!playing);
    };

    const handleArtists = () => {
        return (
            dataSpoty.artists?.map((artist: any) => artist.name).join(', ') ??
            ''
        );
    };

    const handleNext = () => {
        console.log('Next');
        if (indexSong >= dataVideo.length - 1) {
            setIndexSong(1);
            return;
        }
        setIndexSong(indexSong + 1);
    };

    const handlePrevious = () => {
        console.log('Next');
        if (indexSong <= dataVideo.length - 1) {
            setIndexSong(dataVideo.length - 1);
            return;
        }
        setIndexSong(indexSong - 1);
    };

    return (
        <div className="flex flex-row justify-center relative items-center w-full z-50 ring-white ring-2 ring-opacity-30 bg-zinc-900 backdrop-blur-[2px] bg-opacity-5 py-2 shadow-lg h-full">
            <div className="flex w-full relative my-auto justify-between px-8 items-center">
                <CurrentSong
                    title={dataSpoty.name}
                    image={dataSpoty.album?.images[0].url}
                    id={dataSpoty.id}
                    artists={handleArtists()}
                />
                <div className=" w-fit flex md:lg:flex-row flex-col absolute left-0 right-0 m-auto gap-4 items-center">
                    <div className=" flex gap-4">
                        <button
                            title="Next"
                            name="play-button"
                            onClick={handlePrevious}
                            className="bg-white text-black rounded-full p-1">
                            <Previous />
                        </button>
                        <button
                            title="Play / Pause"
                            name="play-button"
                            onClick={handleClick}
                            className="bg-white rounded-full p-2">
                            {playing ? <Pause /> : <Play />}
                        </button>
                        <button
                            title="Next"
                            name="play-button"
                            onClick={handleNext}
                            className="bg-white text-black rounded-full p-1">
                            <Next />
                        </button>
                    </div>
                    <div className=" flex gap-4 items-center">
                        <div className="flex gap-x-3 text-xs md:lg:justify-start justify-center">
                            <SongControl audio={audioRef} />
                        </div>
                        <VolumeControl />
                    </div>
                </div>
            </div>
            <audio
                ref={audioRef}
                onError={() => console.error('Error loading audio')}>
                <track
                    kind="captions"
                    src="captions.vtt"
                    label="Spanish"
                    default
                />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}
