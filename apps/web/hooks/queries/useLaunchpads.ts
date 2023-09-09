import { useMutation, useQuery } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getLaunchpadKey } from '../../lib/key-factories';
import client from '../../lib/api/client';

export function useLaunchpad() {
  const { currentWorkspace } = useWorkspace();
  const launchpadKey = getLaunchpadKey(currentWorkspace.id);

  const query = useQuery(
    launchpadKey,
    async () => {
      const result = await client.get(
        `/workspaces/${currentWorkspace.id}/launchpads`
      );
      return result.data;
    },
    {
      retry: false,
    }
  );

  return query;
}

interface ICreateLaunchpad {
  slug: string;
}

export function useCreateLaunchpad() {
  const { currentWorkspace } = useWorkspace();
  const launchpadKey = getLaunchpadKey(currentWorkspace.id);

  const mut = useMutation(launchpadKey, async (data: ICreateLaunchpad) => {
    const result = await client.post(
      `/workspaces/${currentWorkspace.id}/launchpads`,
      data
    );
    return result.data;
  });

  return mut;
}
