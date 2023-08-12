/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/dropdown-menu';
import { Button } from '../../components/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/alert-dialog';
import {
  Calendar,
  BarChart2,
  Copy,
  Pencil,
  MoreVertical,
  QrCode,
  LinkIcon,
  Trash2,
} from 'lucide-react';

export function Link() {
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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      <div className="flex justify-between bg-white rounded-lg p-8 w-full">
        <div className="flex gap-4">
          <div className="rounded-full flex justify-center items-center border w-12 h-12">
            <img
              alt="fav"
              src="https://www.google.com/s2/favicons?domain=www.google.com&sz=32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <a className="scroll-m-20 text-lg font-semibold tracking-tight hover:underline">
              Google website
            </a>
            <a
              className="text-sm text-blue-700 font-semibold hover:underline"
              href="http://localhost:4200/xYz2"
              target="_blank"
            >
              http://localhost:4200/xYz2
            </a>

            <a
              className="text-sm hover:underline"
              href="https://www.google.com"
              target="_blank"
            >
              https://www.google.com
            </a>

            <div className="flex gap-4 items-center mt-6 text-foreground text-sm font-medium">
              <div className="flex gap-1.5 items-center">
                <Calendar className="w-4 h-4" />
                Jun 17, 2023
              </div>

              <div className="flex gap-1.5 items-center cursor-pointer">
                <BarChart2 className="w-4 h-4" />
                Stats
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary">
            <Copy className="w-3 h-3" />
          </Button>

          <Button variant="outline">
            <Pencil className="w-3 h-3" />
          </Button>

          <Button variant="outline">
            <QrCode className="w-4 h-4" />
          </Button>

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
