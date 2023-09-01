'use client';

import { Loader } from '../../../../components/loader';
import { useLinks } from '../../../../hooks/queries/useLinks';
import { LinkCard } from './link-card';
import { NoLinksFound } from './no-links';

export function Links() {
  const { isLoading, data, error } = useLinks();

  if (isLoading) {
    return <Loader />;
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
        <LinkCard key={link.id} {...link} />
      ))}
    </>
  );
}
