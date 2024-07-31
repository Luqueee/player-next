'use server';
import { Buffer } from 'buffer';
import { search, accessToken } from '@/app/lib/spotify';
import { StringDecoder } from 'string_decoder';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const song = searchParams.get('song');
    console.log('song:', song);
    console.log(
        Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID as string}:${
                process.env.SPOTIFY_CLIENT_SECRET as string
            }`
        ).toString('base64')
    );

    const data = await search(song as string);

    return Response.json(data);
    //return redirect('/')
}
