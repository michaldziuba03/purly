import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { AxiosError } from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return format(date, 'MMM dd, yyyy');
}

export function formatError(err: unknown) {
  if (err instanceof AxiosError) {
    const message: string = err.response?.data.message;
    if (message) {
      return message;
    }
  }

  return 'Something went wrong';
}

export function isCanvasEmpty(canvas: HTMLCanvasElement) {
  const blankCanvas = document.createElement('canvas');
  blankCanvas.width = canvas.width;
  blankCanvas.height = canvas.height;
  return canvas.toDataURL() === blankCanvas.toDataURL();
}
