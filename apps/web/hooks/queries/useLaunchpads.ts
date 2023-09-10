import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getLaunchpadKey } from '../../lib/key-factories';
import client from '../../lib/api/client';
import { AxiosError } from 'axios';
import { toast } from '../useToast';
import { formatError } from '../../lib/utils';

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

interface IAddElement {
  label: string;
  url: string;
}

export function useAddElement() {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspace();
  const launchpadKey = getLaunchpadKey(currentWorkspace.id);

  const mut = useMutation(
    launchpadKey,
    async (data: IAddElement) => {
      const result = await client.post(
        `/workspaces/${currentWorkspace.id}/launchpads/elements`,
        data
      );
      return result.data;
    },
    {
      onSuccess(data) {
        queryClient.setQueryData(launchpadKey, (launchpad: any) => {
          return {
            ...launchpad,
            elements: [...launchpad.elements, data],
          };
        });
      },
    }
  );

  return mut;
}

interface IRemoveElement {
  elementId: string;
}

export function useRemoveElement() {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspace();
  const launchpadKey = getLaunchpadKey(currentWorkspace.id);

  const mut = useMutation(
    launchpadKey,
    async (data: IRemoveElement) => {
      const result = await client.delete(
        `/workspaces/${currentWorkspace.id}/launchpads/elements/${data.elementId}`
      );
      return result.data;
    },
    {
      onSuccess(_, data) {
        queryClient.setQueryData(launchpadKey, (launchpad: any) => {
          const elements = launchpad.elements.filter(
            (element: any) => element.id !== data.elementId
          );
          console.log(elements, launchpad.elements, data);
          return {
            ...launchpad,
            elements,
          };
        });

        return toast({
          title: 'Element deleted successfully',
        });
      },
      onError: (err) =>
        toast({
          title: formatError(err),
          variant: 'destructive',
        }),
    }
  );

  return mut;
}
