'use server';
import { cookies } from 'next/headers';
import { accessToken } from '@/app/lib/spotify';
import { redirect } from 'next/navigation';
export async function GET(request: Request) {
    const data = await accessToken();

    //return Response.json(data);
    return redirect('/');
}
