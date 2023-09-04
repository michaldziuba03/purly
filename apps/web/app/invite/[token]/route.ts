import { headers } from 'next/headers';
import client from '../../../lib/api/client';
import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';

interface Params {
  params: { token: string };
}

export async function GET(request: Request, { params }: Params) {
  const token = params.token;
  try {
    const acceptedInvite = await client.post<{ slug: string }>(
      `/invites/${token}`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: headers().get('cookie'),
        },
      }
    );
    console.log(acceptedInvite.data);
    const path = `/app/${acceptedInvite.data.slug}/dashboard`;
    return NextResponse.redirect(new URL(path, request.url));
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        return NextResponse.redirect(
          new URL(`/auth/login?invite=${token}`, request.url)
        );
      }
    }
    return NextResponse.redirect(new URL('/app', request.url));
  }
}
