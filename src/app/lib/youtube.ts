'use server';

import { YouTube } from 'youtube-sr';
import { Innertube, UniversalCache } from 'youtubei.js';

export async function YoutubeSearch(title: string) {
    try {
        const yt = await Innertube.create({
            cache: new UniversalCache(false),
        });
        const data = await yt.search(title, { type: 'video' });
        console.log('Youtube data2:', data);
        return { data: JSON.parse(JSON.stringify(data)) };
    } catch (error) {
        console.error('Error searching youtube:', error);
        throw error;
    }
}
