'use client';
import { useAuth } from '../../lib/auth';

export const Header = () => {
  const { user } = useAuth();

  return (
    <div>
      {user.id}
      <h1>{user.username}</h1>
    </div>
  );
};
