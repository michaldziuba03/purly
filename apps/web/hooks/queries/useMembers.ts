'use client';

import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getMembers } from '../../lib/api';
import { getMembersKey } from '../../lib/key-factories';

export function useMembers() {
  const { currentWorkspace } = useWorkspace();
  const queryKey = getMembersKey(currentWorkspace.id);
  const query = useQuery(queryKey, () => {
    return getMembers(currentWorkspace.id);
  });

  return query;
}
