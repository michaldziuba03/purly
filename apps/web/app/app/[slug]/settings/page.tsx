import { H3 } from '../../../../components/typography';
import { UpdateWorkspaceForm } from './update-workspace-form';

export default function SettingsPage() {
  return (
    <>
      <H3>Workspace</H3>
      <span>Workspace general settings</span>

      <div className="flex flex-col w-full mt-8 gap-8">
        <UpdateWorkspaceForm />
      </div>
    </>
  );
}
