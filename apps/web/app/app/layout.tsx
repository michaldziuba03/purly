import { withAuth } from '../../lib/auth-hoc';
import React from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 border-l max-h-screen overflow-hidden">
        <Header />
        <div className="border-t bg-muted overflow-y-auto w-full h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AppLayout);
