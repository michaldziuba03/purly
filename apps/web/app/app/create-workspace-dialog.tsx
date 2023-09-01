import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/dialog';
import { CreateWorkspaceForm } from './create-workspace-form';

export function CreateWorkspaceDialog(props: React.PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {props.children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
          <DialogDescription>
            Workspaces are containers for your links, statistics.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkspaceForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
