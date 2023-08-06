'use client';

import React, { useState } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

export interface IUseRecaptcha {
  ref: React.MutableRefObject<ReCAPTCHA>;
  getToken: () => Promise<string | undefined>;
}

export function useRecaptcha(): IUseRecaptcha {
  const [token, setToken] = useState<string>();
  const ref = React.useRef<ReCAPTCHA>();

  async function getToken() {
    // ReCAPTCHA support is optional for self hosted Purly apps
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT) {
      return;
    }

    if (!token) {
      const newToken = await ref.current?.executeAsync();
      if (!newToken) return;

      setToken(newToken as string);
      return newToken;
    }

    return token;
  }

  return {
    ref: ref as React.MutableRefObject<ReCAPTCHA>,
    getToken,
  };
}
