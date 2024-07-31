'use server';
import { redirect } from 'next/navigation';
export async function GET(request: Request) {
    return redirect(
        'https://accounts.spotify.com/authorize?client_id=bec196b7845a4d80b09c4bd4fe7780ec&response_type=code&redirect_uri=http://localhost:3000/api/auth/callback/spotify&scope=user-read-currently-playing%20user-top-read'
    );
    //return redirect('/')
}
