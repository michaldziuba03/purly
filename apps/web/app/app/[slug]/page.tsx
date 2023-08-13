import { useParams } from 'next/navigation';

export default function Home({ params }: any) {
  return <div>Hello world {params.slug}</div>;
}
