'use client';

import { Loader } from '../../../../components/loader';
import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';

type QRCodeImageProps = {
  url: string;
  width?: number;
} & React.ComponentProps<'img'>;

export function QRCodeImage({ width, url, ...props }: QRCodeImageProps) {
  const [qrCode, setQrCode] = useState<string>();
  const [isLoading, setLoader] = useState<boolean>(true);

  useEffect(() => {
    async function getQrCode() {
      setLoader(true);
      const qrUrl = await QRCode.toDataURL(url, {
        width: width || 250,
        margin: 3,
      });
      setQrCode(qrUrl);
      setLoader(false);
    }

    getQrCode();
  }, [url, width]);

  if (isLoading) {
    return <Loader />;
  }

  return <img {...props} src={qrCode} alt="qr code" />;
}
