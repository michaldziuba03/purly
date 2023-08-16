'use client';

import { Input } from '../../../../components/input';
import { Label } from '../../../../components/label';
import { Button } from '../../../../components/button';
import { H2, H3 } from '../../../../components/typography';
import { useWorkspace } from '../../../../lib/workspace';
import { PageWrapper } from '../../page-wrapper';

export const metadata = {
  title: 'Settings | Purly',
  description: 'Purly platform',
};

export default function SettingsPage() {
  const { currentWorkspace } = useWorkspace();
  return (
    <PageWrapper className="bg-white">
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Settings</H2>
      </div>
      <div className="mt-8 w-full flex gap-16">
        <div className="w-[250px] flex flex-col gap-2">
          <Button className="w-full text-base justify-start" variant="link">
            Account
          </Button>
          <Button
            className="w-full text-base font-bold justify-start"
            variant="secondary"
          >
            Workspace
          </Button>
          <Button className="w-full text-base justify-start" variant="link">
            Billing
          </Button>
          <Button
            disabled
            className="w-full text-base justify-start"
            variant="link"
          >
            API Keys
          </Button>
        </div>
        <div>
          <H3>Workspace</H3>
          <span>Workspace general settings</span>

          <div className="flex flex-col w-full mt-8 gap-8">
            <div className="flex flex-col space-y-1.5">
              <Label className="font-bold">Display Name</Label>
              <span className="text-sm text-muted-foreground">
                Change workspace display name
              </span>
              <Input value={currentWorkspace.name} className="w-96" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label className="font-bold">Pathname</Label>
              <span className="text-sm text-muted-foreground">
                You cannot change workspace pathname
              </span>
              <Input disabled value={currentWorkspace.slug} className="w-96" />
            </div>

            <div>
              <Button>Update workspace</Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
