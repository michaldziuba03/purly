'use client';

import { Button } from '../../components/button';
import { Separator } from '../../components/separator';
import { Link, Settings, Users, Globe, Home, LayoutGrid } from 'lucide-react';
import { WorkspacesDropdown } from './workspaces-dropdown';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { useWorkspaceRouter } from '../../hooks/useWorkspaceRouter';

interface NavButtonProps extends React.PropsWithChildren {
  href: string;
}

function NavButton({ children, href }: NavButtonProps) {
  const { getPath } = useWorkspaceRouter();
  const pathname = usePathname();
  const isActive = pathname.startsWith(getPath(href));

  return (
    <Button
      asChild
      variant={isActive ? 'secondary' : 'ghost'}
      className="relative w-full justify-start"
    >
      <NextLink
        href={getPath(href)}
        className={cn(
          isActive
            ? 'before:absolute before:w-1.5 before:inset-0 before:bg-primary before:rounded-l-md'
            : undefined
        )}
      >
        {children}
      </NextLink>
    </Button>
  );
}

export function Sidebar() {
  return (
    <div className="w-80 pb-6 flex flex-col justify-between">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 space-y-4">
          <WorkspacesDropdown />
          <Separator />
        </div>

        <div className="px-3 py-4">
          <div className="space-y-2.5">
            <NavButton href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavButton>
            <NavButton href="/links">
              <Link className="mr-2 h-4 w-4" />
              Links
            </NavButton>
            <NavButton href="/launchpads">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Link in Bio
            </NavButton>
            <NavButton href="/members">
              <Users className="mr-2 h-4 w-4" />
              Team
            </NavButton>
            <NavButton href="/domains">
              <Globe className="mr-2 h-4 w-4" />
              Domains
            </NavButton>
            <div className="py-2">
              <Separator />
            </div>
            <NavButton href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </NavButton>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center">
        Support • Docs • Feedback
      </div>
    </div>
  );
}
