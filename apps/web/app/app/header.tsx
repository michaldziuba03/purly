'use client';

import { UserDropdown } from './user-dropdown';

export const Header = () => {
  return (
    <div className="w-full h-16 px-6 flex justify-end items-center">
      <UserDropdown />
    </div>
  );
};
