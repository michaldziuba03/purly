import React, { useMemo } from 'react';
import QRCode from 'qrcode';
import { QRCodeImage } from './qr-code';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../components/dialog';
import { Clipboard, Download } from 'lucide-react';
import { Button } from '../../../../components/button';
import { useToast } from '../../../../hooks/useToast';
import { isCanvasEmpty } from '../../../../lib/utils';

interface IQrCodeModalProps extends React.PropsWithChildren {
  url: string;
  alias?: string;
}

async function getQrCanvas(url: string) {
  const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
  if (isCanvasEmpty(canvas)) {
    await QRCode.toCanvas(canvas, url, {
      width: 656,
    });
  }

  return canvas;
}

export function QrCodeModal(props: IQrCodeModalProps) {
  const { toast } = useToast();
  const urlPreview = useMemo(() => {
    const url = new URL(props.url);

    return `${url.host}${url.pathname}`;
  }, [props.url]);

  async function downloadFile() {
    const canvas = await getQrCanvas(props.url);
    const linkRef = document.getElementById('qr-ref') as HTMLAnchorElement;

    if (!canvas || !linkRef) return;

    linkRef.href = canvas.toDataURL('png');
    linkRef.download = `${props.alias || 'purly'}-qr.png`;
    linkRef.click();
  }

  async function copyBlob() {
    const canvas = await getQrCanvas(props.url);
    canvas.toBlob(async (blob) => {
      if (!blob) throw Error('Something went wrong');

      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);

      toast({
        title: 'QR code image copied to clipboard',
      });
    }, 'image/png');
  }

  return (
    <Dialog>
      <DialogContent>
        <canvas id="qr-canvas" className="hidden"></canvas>
        <a id="qr-ref" className="hidden"></a>
        <div className="w-full gap-4 flex flex-col justify-center">
          <div className="text-center">
            <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
              QR Code
            </h3>
            <span className="text-sm">
              Scan the image below to preview your QR Code
            </span>
          </div>
          <div className="mt-3 flex w-full justify-center">
            <QRCodeImage
              className="border rounded"
              url={props.url}
              width={260}
            />
          </div>
          <a
            href={props.url}
            className="text-center text-blue-700 text-sm font-semibold"
          >
            {urlPreview}
          </a>
        </div>
        <div className="flex gap-4 items-center justify-center w-full">
          <Button className="mt-4" onClick={copyBlob}>
            <Clipboard className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button className="mt-4" onClick={downloadFile}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </DialogContent>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
    </Dialog>
  );
}
