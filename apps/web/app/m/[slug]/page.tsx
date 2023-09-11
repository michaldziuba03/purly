import { redirect } from 'next/navigation';
import client from '../../../lib/api/client';
import { AxiosError } from 'axios';
import { Launchpad } from './launchpad';

export default async function BioPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  try {
    const response = await client.get(`/launchpads/${slug}`);
    return <Launchpad {...response.data} />;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 404) {
        return redirect('/404');
      }
    }

    throw err;
  }
}
