'use client';

import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getLinks } from '../../lib/api';

export function useLinks() {
  const { currentWorkspace } = useWorkspace();
  const { data, error, isFetching } = useQuery(['links'], () => {
    return getLinks(currentWorkspace.id);
  });

  return { data, error, isFetching };
}
