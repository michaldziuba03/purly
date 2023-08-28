'use client';

import { useLinks } from '../../../../hooks/queries/useLinks';
import { Link } from './link';
import { NoLinksFound } from './no-links';
import { QRCodeImage } from './qr-code';

export function Links() {
  const { isFetching, data, error } = useLinks();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data.length) {
    return <NoLinksFound />;
  }

  return (
    <>
      {data.map((link: any) => (
        <Link key={link.id} {...link} />
      ))}
    </>
  );
}
