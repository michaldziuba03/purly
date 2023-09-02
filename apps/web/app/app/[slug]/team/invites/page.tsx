import { Invites } from './invites';

export const metadata = {
  title: 'Invites | Purly',
  description: 'Purly platform',
};

export default function InvitesPage() {
  return (
    <div className="flex flex-col gap-4">
      <Invites />
    </div>
  );
}
