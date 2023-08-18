import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AuthProvider } from '../../lib/auth';
import { getSessionUser } from '../../lib/api';

const GuestOnlyLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const user = await getSessionUser(headers().get('cookie') as string);
  if (user) {
    return redirect('/app');
  }

  return (
    <>
      <AuthProvider user={user}>{children}</AuthProvider>
    </>
  );
};

export default GuestOnlyLayout;
