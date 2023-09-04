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
} from '../../../../../components/alert-dialog';
import { Button } from '../../../../../components/button';
import { useRevokeInvite } from '../../../../../hooks/queries/useInvites';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';

interface IDeleteInviteAlertProps extends React.PropsWithChildren {
  email: string;
}

export function DeleteInviteAlert(props: IDeleteInviteAlertProps) {
  const { isLoading, mutate } = useRevokeInvite();

  function handleRevokeInvite() {
    mutate({ email: props.email });
  }

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Revoke invite?</AlertDialogTitle>
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
            {isLoading ? 'Revoking...' : 'Confirm revoke'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
      {props.children}
    </AlertDialog>
  );
}
