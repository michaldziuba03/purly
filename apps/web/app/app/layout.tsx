import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AuthProvider } from '../../lib/auth';
import { getSessionUser, getSessionWorkspaces } from '../../lib/api';
import { WorkspaceProvider } from './workspace';
import getQueryClient from '../../lib/query-client';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getWorkspacesKey, getUserKey } from '../../lib/key-factories';

const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const cookie = headers().get('cookie') as string;
  const user = await getSessionUser(cookie);
  if (!user) {
    return redirect('/auth/login');
  }

  const workspaces = await getSessionWorkspaces(cookie);

  const queryClient = getQueryClient();
  queryClient.setQueryData(getUserKey(), user);
  queryClient.setQueryData(getWorkspacesKey(), workspaces);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <AuthProvider>
        <WorkspaceProvider>
          <div className="w-full flex">
            <Sidebar />
            <div className="w-full border-l h-screen overflow-hidden">
              <Header />
              <div className="border-t bg-muted overflow-y-auto w-full h-workspace">
                {children}
              </div>
            </div>
          </div>
        </WorkspaceProvider>
      </AuthProvider>
    </Hydrate>
  );
};

export default AppLayout;
