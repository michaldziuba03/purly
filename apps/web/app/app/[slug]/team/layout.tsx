import { Send } from 'lucide-react';
import { Button } from '../../../../components/button';
import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';
import React from 'react';
import { TeamRoutesSwitches } from './team-routes';
import { CreateInviteModal } from './invites/invite-modal';

export default function TeamLayout(props: React.PropsWithChildren) {
  return (
    <PageWrapper className="bg-white">
      <div className="flex pb-6 justify-between items-center">
        <div>
          <H2>Team</H2>
          <span className="text-sm text-muted-foreground">
            People that have access to this workspace.
          </span>
        </div>
        <CreateInviteModal>
          <Button>
            <Send className="mr-3 w-4 h-4" />
            Invite
          </Button>
        </CreateInviteModal>
      </div>
      <div className="flex gap-3 w-full">
        <TeamRoutesSwitches />
      </div>
      <div className="mt-12 w-full">{props.children}</div>
    </PageWrapper>
  );
}
