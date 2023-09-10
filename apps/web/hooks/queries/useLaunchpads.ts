import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getLaunchpadKey } from '../../lib/key-factories';
import client from '../../lib/api/client';
import { AxiosError } from 'axios';

export function useLaunchpad() {
  const { currentWorkspace } = useWorkspace();
  const launchpadKey = getLaunchpadKey(currentWorkspace.id);

  const query = useQuery(launchpadKey, async () => {
    try {
      const result = await client.get(
        `/workspaces/${currentWorkspace.id}/launchpads`
      );
      return result.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          return null;
        }
      }
      throw err;
    }
  });

  return query;
}

interface ICreateLaunchpad {
  slug: string;
}

export function useCreateLaunchpad() {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspace();
  const launchpadKey = getLaunchpadKey(currentWorkspace.id);

  const mut = useMutation(
    launchpadKey,
    async (data: ICreateLaunchpad) => {
      const result = await client.post(
        `/workspaces/${currentWorkspace.id}/launchpads`,
        data
      );
      return result.data;
    },
    {
      onSuccess(data) {
        queryClient.setQueryData(launchpadKey, data);
      },
    }
  );

  return mut;
}
