'use server';
import { YouTube } from 'youtube-sr';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('song') || '';
    const videos = await YouTube.search(title, {
        limit: 1,
        type: 'all',
    });

    console.log(videos);
    return Response.json(videos);
}
