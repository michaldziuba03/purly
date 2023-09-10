'use client';

import { useLaunchpad } from '../../../../hooks/queries/useLaunchpads';
import { formatError } from '../../../../lib/utils';
import CreateLaunchpadView from './create-launchpad';
import { ShowLaunchpadView } from './show-launchpad';

export function Launchpad() {
  const { isLoading, isError, error, data } = useLaunchpad();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return formatError(error);
  }

  if (!data) {
    return <CreateLaunchpadView />;
  }

  return <ShowLaunchpadView {...data} />;
}
