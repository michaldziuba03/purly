import { withAuth } from '../../lib/auth-hoc';
import React from 'react';

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default withAuth(AppLayout);
