import { Badge } from '../../../../components/badge';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../../../components/avatar';
import { Button } from '../../../../components/button';
import { MoreVertical, Trash2 } from 'lucide-react';
import { formatDate } from '../../../../lib/utils';
import { RoleBadge } from './role-badge';
import { MemberRole } from '@purly/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/dropdown-menu';
import { AlertDialogTrigger } from '../../../../components/alert-dialog';
import { RemoveMemberAlert } from './remove-member-alert';

interface IMemberCardProps {
  id: string;
  username: string;
  picture: string;
  email: string;
  role: MemberRole;
  createdAt: string;
  isUser?: boolean;
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

        <DropdownMenu>
          <RemoveMemberAlert userId={props.id}>
            <DropdownMenuTrigger asChild>
              <Button disabled={props.isUser} variant="ghost">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <AlertDialogTrigger className="w-full">
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-3 w-3 h-3" /> Remove member
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </RemoveMemberAlert>
        </DropdownMenu>
      </div>
    </div>
  );
}
