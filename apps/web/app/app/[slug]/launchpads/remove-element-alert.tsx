'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../../components/alert-dialog';
import { Button } from '../../../../components/button';
import { useRemoveElement } from '../../../../hooks/queries/useLaunchpads';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

interface IRemoveMemberAlertProps extends React.PropsWithChildren {
  elementId: string;
}

export function RemoveElementAlert(props: IRemoveMemberAlertProps) {
  const { isLoading, mutate } = useRemoveElement();

  function handleRevokeInvite() {
    mutate({ elementId: props.elementId });
  }

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this button?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleRevokeInvite}
            disabled={isLoading}
          >
            {isLoading ? 'Removing...' : 'Remove'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
      <AlertDialogTrigger>{props.children}</AlertDialogTrigger>
    </AlertDialog>
  );
}
