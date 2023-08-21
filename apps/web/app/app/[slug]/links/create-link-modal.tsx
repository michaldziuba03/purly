'use client';

import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../../components/dialog';
import React, { useState } from 'react';
import { CreateLinkForm } from './create-link-form';

export function CreateLinkModal(props: React.PropsWithChildren) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Create new link</DialogTitle>
        </DialogHeader>
        <CreateLinkForm closeDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}
