'use client';

import { Input } from '../../../../components/input';
import { Label } from '../../../../components/label';
import { Button } from '../../../../components/button';
import { H3 } from '../../../../components/typography';
import { useWorkspace } from '../../workspace';

export const metadata = {
  title: 'Settings | Purly',
  description: 'Purly platform',
};

export default function SettingsPage() {
  const { currentWorkspace } = useWorkspace();
  return (
    <>
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
    </>
  );
}
