import { useQuery } from '@tanstack/react-query';
import { getInvitesKey } from '../../lib/key-factories';
import { useWorkspace } from '../../app/app/workspace';
import client from '../../lib/api/client';

export function useInvites() {
  const { currentWorkspace } = useWorkspace();
  const invitesKey = getInvitesKey(currentWorkspace.id);
  const query = useQuery(invitesKey, async () => {
    const result = await client.get(
      `/workspaces/${currentWorkspace.id}/members/invites`
    );
    return result.data;
  });

  return query;
}
