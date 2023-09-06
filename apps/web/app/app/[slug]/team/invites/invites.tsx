'use client';

import { formatError } from '../../../../../lib/utils';
import { useInvites } from '../../../../../hooks/queries/useInvites';
import { InviteCard } from './invite-card';

export function Invites() {
  const { isLoading, data, isError, error } = useInvites();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return formatError(error);
  }

  if (!data.length) {
    return 'No invites';
  }

  return data.map((invite: any) => (
    <InviteCard key={invite.email} {...invite} />
  ));
}
