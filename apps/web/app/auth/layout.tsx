import { withGuest } from '../../lib/auth-hoc';
import React from 'react';

const GuestOnlyLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default withGuest(GuestOnlyLayout);
