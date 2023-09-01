'use client';
import React, { createContext, useContext } from 'react';
import { useCurrentUser } from '../hooks/queries/useUsers';

export const AuthContext = createContext<any>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data } = useCurrentUser();
  return (
    <AuthContext.Provider value={{ user: data }}>
      {children}
    </AuthContext.Provider>
  );
};
