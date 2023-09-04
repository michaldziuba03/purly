import { Members } from './members';

export const metadata = {
  title: 'Members | Purly',
  description: 'Purly platform',
};

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-4">
      <Members />
    </div>
  );
}
