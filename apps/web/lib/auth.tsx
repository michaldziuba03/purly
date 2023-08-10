'use client';
import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext<any>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<
  React.PropsWithChildren & { user?: any }
> = ({ children, user }) => {
  const [userData, setUser] = useState(user);
  return (
    <AuthContext.Provider value={{ user: userData, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
