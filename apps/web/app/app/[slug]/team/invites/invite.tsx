import { formatDate } from '../../../../../lib/utils';
import { Avatar, AvatarFallback } from '../../../../../components/avatar';
import { Badge } from '../../../../../components/badge';
import { Button } from '../../../../../components/button';
import { MoreVertical } from 'lucide-react';

interface IInviteProps {
  token: string;
  email: string;
  workspaceId: string;
  invitedAt: string;
}

export function InviteCard(props: IInviteProps) {
  return (
    <div className="flex w-full justify-between items-center gap-4 pb-4 last:border-none border-b">
      <div className="flex gap-4 items-center">
        <Avatar className="border w-11 h-11">
          <AvatarFallback>{props.email[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm flex items-center gap-2">
            <span className="font-bold">{props.email}</span>
            <Badge className="text-orange-100 bg-orange-700 hover:bg-orange-7800">
              Pending
            </Badge>
          </span>
          <span className="text-sm text-muted-foreground">{props.email}</span>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm text-muted-foreground">
          Invited at {formatDate(props.invitedAt)}
        </span>
        <Button variant="ghost">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
