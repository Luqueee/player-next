export function GetTime(ms: number) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    let time = '';

    if (hours > 0) {
        time += hours + ':';
    }

    if (minutes > 0) {
        time += (minutes % 60) + 'm ';
    }

    time += (seconds % 60) + 's';

    return time;
}
