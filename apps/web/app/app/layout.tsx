import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { AuthProvider } from '../../lib/auth';
import { getSessionUser, getSessionWorkspaces } from '../../lib/api';
import { WorkspaceProvider } from './workspace';

const AppLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const cookie = headers().get('cookie') as string;
  const user = await getSessionUser(cookie);
  if (!user) {
    return redirect('/auth/login');
  }

  const workspaces = await getSessionWorkspaces(cookie);

  return (
    <AuthProvider user={user}>
      <WorkspaceProvider workspaces={workspaces}>
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
  );
};

export default AppLayout;
