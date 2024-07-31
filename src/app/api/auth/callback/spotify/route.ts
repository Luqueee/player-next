'use server';
import { Buffer } from 'buffer';
import { cookies } from 'next/headers';
import { getTokens } from '@/app/lib/spotify';
import { redirect } from 'next/navigation';
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    console.log('code:', code);

    const { data } = await getTokens(code as string);

    cookies().set('access_token', data.access_token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
    cookies().set('refresh_token', data.refresh_token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });

    //return Response.json(data);
    return redirect('/');
}
