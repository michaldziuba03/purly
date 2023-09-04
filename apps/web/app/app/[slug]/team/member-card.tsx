import { Badge } from '../../../../components/badge';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../../../components/avatar';
import { Button } from '../../../../components/button';
import { MoreVertical } from 'lucide-react';
import { formatDate } from '../../../../lib/utils';
import { RoleBadge } from './role-badge';
import { MemberRole } from '@purly/shared';

interface IMemberCardProps {
  id: string;
  username: string;
  picture: string;
  email: string;
  role: MemberRole;
  createdAt: string;
}

export function MemberCard(props: IMemberCardProps) {
  return (
    <div className="flex w-full justify-between items-center gap-4 pb-4 last:border-none border-b">
      <div className="flex gap-4 items-center">
        <Avatar className="border w-11 h-11">
          <AvatarImage src={props.picture} alt="member avatar" />
          <AvatarFallback>{props.username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm flex items-center gap-2">
            <span className="font-bold">{props.username}</span>
            <RoleBadge role={props.role} />
          </span>
          <span className="text-sm text-muted-foreground">{props.email}</span>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm text-muted-foreground">
          Since {formatDate(props.createdAt)}
        </span>
        <Button variant="ghost">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
