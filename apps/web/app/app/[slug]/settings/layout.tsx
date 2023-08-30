import { PageWrapper } from '../../page-wrapper';
import { Button } from '../../../../components/button';
import { H2, H3 } from '../../../../components/typography';
import React from 'react';

export default function SettingsLayout(props: React.PropsWithChildren) {
  return (
    <PageWrapper className="bg-white">
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Settings</H2>
      </div>
      <div className="mt-8 w-full flex gap-16">
        <div className="w-[250px] flex flex-col gap-2">
          <Button className="w-full justify-start" variant="link">
            Account
          </Button>
          <Button
            className="w-full font-bold justify-start"
            variant="secondary"
          >
            Workspace
          </Button>
          <Button className="w-full justify-start" variant="link">
            Billing
          </Button>
          <Button disabled className="w-full justify-start" variant="link">
            API Keys
          </Button>
        </div>
        <div>{props.children}</div>
      </div>
    </PageWrapper>
  );
}
