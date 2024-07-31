'use client';

import Image from 'next/image';

export default function Home() {
    return (
        <div className="max-w-[19rem] h-80 rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap mt-10 ml-10">
            <Image
                src={
                    'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/sad_emoji.41405e6f.svg'
                }
                width={160}
                height={150}
                alt="sad emoji"
            />
            <a
                href={`https://accounts.spotify.com/authorize?client_id=bec196b7845a4d80b09c4bd4fe7780ec&response_type=code&redirect_uri=${process.env.REDIRECT_URI}/api/auth/callback/spotify&scope=user-read-currently-playing%20user-top-read`}
                className="shadow-primary w-56 h-16 rounded-xl bg-white border-0 text-black text-3xl active:scale-[0.99]">
                Sign In
            </a>
        </div>
    );
}
