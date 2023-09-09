'use client';

import { AxiosError } from 'axios';
import { useLaunchpad } from '../../../../hooks/queries/useLaunchpads';
import { formatError } from '../../../../lib/utils';
import CreateLaunchpadView from './create-launchpad';

export function Launchpad() {
  const { isLoading, isError, error, data } = useLaunchpad();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return <CreateLaunchpadView />;
      }
    }

    return formatError(error);
  }

  return JSON.stringify(data);
}
