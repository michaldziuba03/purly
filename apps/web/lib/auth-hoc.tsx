/* eslint-disable react/display-name */
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AuthProvider } from './auth';
import { getSessionUser } from './api';

export function withAuth(Component: React.ComponentType) {
  return async (props: object) => {
    const user = await getSessionUser(headers().get('cookie') as string);
    if (!user) {
      return redirect('/auth/login');
    }

    return (
      <>
        <AuthProvider user={user}>
          <Component {...props} />
        </AuthProvider>
      </>
    );
  };
}

export function withGuest(Component: React.ComponentType) {
  return async (props: object) => {
    const user = await getSessionUser(headers().get('cookie') as string);
    if (user) {
      return redirect('/app');
    }

    return (
      <>
        <AuthProvider user={user}>
          <Component {...props} />
        </AuthProvider>
      </>
    );
  };
}
