'use client';

import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getMembers } from '../../lib/api';

export function useMembers() {
  const { currentWorkspace } = useWorkspace();
  const { data, error, isFetching } = useQuery(['members'], () => {
    return getMembers(currentWorkspace.id);
  });

  return { data, error, isFetching };
}
