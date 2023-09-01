import { PageWrapper } from '../../page-wrapper';
import { H2 } from '../../../../components/typography';
import React from 'react';
import SettingsBar from './settings-sidebar';

export const metadata = {
  title: 'Settings | Purly',
  description: 'Purly platform',
};

export default function SettingsLayout(props: React.PropsWithChildren) {
  return (
    <PageWrapper className="bg-white">
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Settings</H2>
      </div>
      <div className="mt-8 w-full flex gap-16">
        <SettingsBar />
        <div>{props.children}</div>
      </div>
    </PageWrapper>
  );
}
