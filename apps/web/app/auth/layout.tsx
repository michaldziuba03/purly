import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getSessionUser } from '../../lib/api';

const GuestOnlyLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const user = await getSessionUser(headers().get('cookie') as string);
  if (user) {
    return redirect('/app');
  }

  return <>{children}</>;
};

export default GuestOnlyLayout;
