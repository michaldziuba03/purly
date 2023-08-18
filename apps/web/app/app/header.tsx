'use client';

import { HelpCircle } from 'lucide-react';
import { Button } from '../../components/button';
import { UserDropdown } from './user-dropdown';

export const Header = () => {
  return (
    <div className="w-full bg-white h-16 px-6 flex justify-end items-center">
      <Button className="mr-6 text-muted-foreground" variant="ghost">
        <HelpCircle className="w-4 h-4 mr-1.5" />
        Feedback?
      </Button>
      <UserDropdown />
    </div>
  );
};
