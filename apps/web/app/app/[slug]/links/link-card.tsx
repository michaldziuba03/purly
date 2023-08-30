/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/dropdown-menu';
import { Button } from '../../../../components/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../../components/alert-dialog';
import {
  Calendar,
  BarChart2,
  Copy,
  Pencil,
  MoreVertical,
  QrCode,
  LinkIcon,
  Check,
  Trash2,
} from 'lucide-react';
import { formatDate } from '../../../../lib/utils';
import { useDeleteLink } from '../../../../hooks/queries/useLinks';
import { useToast } from '../../../../hooks/useToast';
import { copyToClipboard } from '../../../../lib/clipboard';
import { QrCodeModal } from './qr-code-modal';

interface ILinkProps {
  id: string;
  name?: string;
  alias: string;
  url: string;
  createdAt: string;
}

export function LinkCard(props: ILinkProps) {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);
  const shortlink = `http://localhost:4200/${props.alias}`;
  const { error, isLoading, mutateAsync } = useDeleteLink();
  const { toast } = useToast();

  async function handleDeleteLink() {
    await mutateAsync(props.id);
  }

  async function handleCopy() {
    try {
      await copyToClipboard(shortlink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
      toast({ title: 'Copied link to clipboard.' });
    } catch (err) {
      toast({ title: 'Something went wrong.', variant: 'destructive' });
    }
  }

  const url = new URL(props.url);

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete link?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this link
            and redirect it to the home page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteLink}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Confirm delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
      <div className="flex justify-between bg-white rounded-lg px-8 py-6 w-full border">
        <div className="flex gap-4">
          <div className="rounded-full flex justify-center items-center border w-12 h-12">
            <img
              alt="fav"
              src={`https://www.google.com/s2/favicons?domain=${url.host}&sz=32`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`${pathname}/${props.id}`}
              className="scroll-m-20 text-lg font-semibold tracking-tight hover:underline"
            >
              {props.name ? props.name : url.hostname}
            </Link>
            <a
              className="text-sm text-blue-700 font-semibold hover:underline"
              href={`http://localhost:4200/${props.alias}`}
              target="_blank"
            >
              {shortlink}
            </a>

            <a
              className="text-sm hover:underline"
              href={props.url}
              target="_blank"
            >
              {props.url}
            </a>

            <div className="flex gap-4 items-center mt-6 text-foreground text-sm font-medium">
              <div className="flex gap-1.5 items-center">
                <Calendar className="w-4 h-4" />
                {formatDate(props.createdAt)}
              </div>

              <div className="flex gap-1.5 items-center cursor-pointer">
                <BarChart2 className="w-4 h-4" />
                Stats
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className={
              isCopied ? 'hover:bg-blue-100 hover:text-blue-800' : undefined
            }
            onClick={handleCopy}
            variant="secondary"
          >
            {isCopied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>

          <Button variant="outline">
            <Pencil className="w-3 h-3" />
          </Button>

          <QrCodeModal url={shortlink} alias={props.alias}>
            <Button variant="outline">
              <QrCode className="w-4 h-4" />
            </Button>
          </QrCodeModal>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>
                <Pencil className="mr-3 w-3 h-3" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LinkIcon className="mr-3 w-3 h-3" /> View Link
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden">
                <QrCode className="mr-3 w-3 h-3" /> QR Code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger className="w-full">
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-3 w-3 h-3" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </AlertDialog>
  );
}
