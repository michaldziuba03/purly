'use client';

import React from 'react';
import { Button } from '../../../../components/button';
import { usePathname } from 'next/navigation';
import { useWorkspaceRouter } from '../../../../hooks/useWorkspaceRouter';
import { cn } from '../../../../lib/utils';
import Link from 'next/link';

interface SettingsHref {
  name: string;
  href: string;
  disabled?: boolean;
}

const settingsHrefs: SettingsHref[] = [
  { name: 'Account', href: '/account' },
  { name: 'Workspace', href: '' },
  { name: 'Billing', href: '/billing', disabled: true },
  { name: 'API Keys', href: '/api', disabled: true },
];

export default function SettingsBar() {
  const pathname = usePathname();
  const { getPath } = useWorkspaceRouter();
  const basePath = getPath('/settings');

  return (
    <div className="w-[250px] flex flex-col gap-2">
      {settingsHrefs.map((route) => (
        <Button
          key={route.name}
          asChild
          className={cn(
            'w-full justify-start',
            basePath + route.href === pathname ? 'font-bold' : undefined
          )}
          variant={basePath + route.href === pathname ? 'secondary' : 'link'}
          disabled={route.disabled}
        >
          <Link href={basePath + route.href}>{route.name}</Link>
        </Button>
      ))}
    </div>
  );
}
