import { Badge } from '../../../../components/badge';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../../../../components/avatar';
import { Button } from '../../../../components/button';
import { MoreVertical } from 'lucide-react';

export function MemberCard() {
  return (
    <div className="flex w-full justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        <Avatar className="border w-11 h-11">
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm flex items-center gap-2">
            <span className="font-semibold">Michał Dziuba</span>
            <Badge>Owner</Badge>
          </span>
          <span className="text-sm text-muted-foreground">
            mail@michaldziuba.dev
          </span>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <span className="text-sm text-muted-foreground">Since Aug 11 2023</span>
        <Button variant="ghost">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
