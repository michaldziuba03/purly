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
import { useRemoveMember } from '../../../../hooks/queries/useMembers';

interface IRemoveMemberAlertProps extends React.PropsWithChildren {
  userId: string;
}

export function RemoveMemberAlert(props: IRemoveMemberAlertProps) {
  const { isLoading, mutate } = useRemoveMember();

  function handleRevokeInvite() {
    mutate({ userId: props.userId });
  }

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this member?</AlertDialogTitle>
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
            {isLoading ? 'Removing...' : 'Remove member'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
      {props.children}
    </AlertDialog>
  );
}
