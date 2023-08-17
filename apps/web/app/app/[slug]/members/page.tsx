import { Send } from 'lucide-react';
import { Button } from '../../../../components/button';
import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';
import { MemberCard } from './member-card';

export const metadata = {
  title: 'Members | Purly',
  description: 'Purly platform',
};

export default function MembersPage() {
  return (
    <PageWrapper className="bg-white">
      <div className="flex pb-6 justify-between items-center">
        <div>
          <H2>Team</H2>
          <span className="text-sm text-muted-foreground">
            People that have access to this workspace.
          </span>
        </div>
        <Button>
          <Send className="mr-3 w-4 h-4" />
          Invite
        </Button>
      </div>
      <div className="flex gap-3 w-full">
        <div className="border-b-primary border-b-2">
          <Button className="font-semibold" variant="ghost">
            Members
          </Button>
        </div>

        <Button variant="ghost">Invites</Button>
      </div>
      <div className="mt-12 w-full">
        <MemberCard />
      </div>
    </PageWrapper>
  );
}
