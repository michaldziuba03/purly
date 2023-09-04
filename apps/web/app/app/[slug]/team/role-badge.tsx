import { MemberRole } from '@purly/shared';
import { Badge } from '../../../../components/badge';

interface IRoleBadgeProps {
  role: MemberRole;
}

export function RoleBadge({ role }: IRoleBadgeProps) {
  if (role === MemberRole.ADMIN) {
    return (
      <Badge className="bg-yellow-600 text-yellow-100 hover:bg-yellow-700">
        Admin
      </Badge>
    );
  }

  if (role === MemberRole.CLIENT) {
    return <Badge className="bg-gray-500 text-gray-100">Readonly</Badge>;
  }

  if (role === MemberRole.MEMBER) {
    return <Badge>Member</Badge>;
  }

  if (role === MemberRole.OWNER) {
    return (
      <Badge className="bg-red-600 text-red-100 hover:bg-red-700">Owner</Badge>
    );
  }

  return null;
}
