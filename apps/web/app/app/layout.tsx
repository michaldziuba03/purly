import { withAuth } from '../../lib/auth-hoc';
import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 border-l bg-muted max-h-screen overflow-hidden">
        <Header />
        <div className="p-10 border-t overflow-y-auto h-screen">{children}</div>
      </div>
    </div>
  );
};

export default withAuth(AppLayout);
