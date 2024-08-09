'use server';

import { Innertube, UniversalCache } from 'youtubei.js';

export async function getInfoVideo(title: string) {
    try {
        const yt = await Innertube.create({
            /* setup - see above */
        });
        const dataSong = await yt.music.search(title);
        //console.log('Youtube data:', dataSong.contents![2].contents);
        const id_song = (dataSong.contents![3].contents![1] as any).id;

        //const data_firstResult = dataSong.contents![3].contents![1];
        //console.log('Youtube data first result:', data_firstResult);
        //console.log('Youtube id song:', id_song);

        const songInfo = await yt.music.getInfo(id_song);
        const listSongs = await yt.music.getUpNext(id_song);

        return { songInfo, listSongs, id_song };
    } catch (error) {
        console.error('Error getting video info:', error);
        throw error;
    }
}

export async function searchYoutubeSong(title: string) {
    try {
        const yt = await Innertube.create({
            /* setup - see above */
        });
        const dataSong = await yt.music.search(title);

        return { data: JSON.parse(JSON.stringify(dataSong)) };
    } catch (error) {
        console.error('Error getting video info:', error);
        throw error;
    }
}

export async function getUrlVideo(info: any) {
    try {
        const yt = await Innertube.create({
            /* setup - see above */
        });

        const format = info.chooseFormat({
            type: 'audio',
            quality: 'best',
        });
        const url = format?.decipher(yt.session.player);

        //console.log('Youtube format:', format);
        //console.log('Youtube url:', url);

        return url;
    } catch (error) {
        console.error('Error getting video url:', error);
        throw error;
    }
}

export async function YoutubeSearch(title: string) {
    const { songInfo, listSongs, id_song } = await getInfoVideo(title);

    const url = await getUrlVideo(songInfo);
    console.log('Youtube song info:', url);
    //console.log('Youtube data:', songInfo);

    return {
        data: JSON.parse(JSON.stringify(listSongs)),
        url: url,
        id_song: id_song,
    };
}
