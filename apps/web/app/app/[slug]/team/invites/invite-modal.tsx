'use client';

import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '../../../../../components/dialog';
import React, { useState } from 'react';
import { CreateInviteForm } from './create-invite-form';

export function CreateInviteModal(props: React.PropsWithChildren) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader className="mb-8">
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>
            Invite a new member into your workspace
          </DialogDescription>
        </DialogHeader>
        <CreateInviteForm closeModal={setShowModal} />
      </DialogContent>
      <DialogTrigger>{props.children}</DialogTrigger>
    </Dialog>
  );
}
