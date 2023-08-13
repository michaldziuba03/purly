/* eslint-disable react/display-name */
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AuthProvider } from './auth';
import { getSessionUser, getSessionWorkspaces } from './api';
import { WorkspaceProvider } from './workspace';

export function withAuth(Component: React.ComponentType) {
  return async (props: object) => {
    const cookie = headers().get('cookie') as string;
    const user = await getSessionUser(cookie);
    if (!user) {
      return redirect('/auth/login');
    }

    const workspaces = await getSessionWorkspaces(cookie);

    return (
      <>
        <AuthProvider user={user}>
          <WorkspaceProvider workspaces={workspaces}>
            <Component {...props} />
          </WorkspaceProvider>
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
