'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../../../../components/button';
import { useWorkspaceRouter } from '../../../../hooks/useWorkspaceRouter';

const teamRoutes = [
  { name: 'Members', href: '' },
  { name: 'Invites', href: '/invites' },
];

export function TeamRoutesSwitches() {
  const pathname = usePathname();
  const { getPath } = useWorkspaceRouter();
  const basePath = getPath('/team');

  return teamRoutes.map((route) => {
    const href = basePath + route.href;
    const isActive = href === pathname;

    return (
      <Link
        href={href}
        key={route.name}
        className={isActive ? 'border-b-primary border-b-2' : undefined}
      >
        <Button
          className={isActive ? 'font-semibold' : undefined}
          variant="ghost"
        >
          {route.name}
        </Button>
      </Link>
    );
  });
}
