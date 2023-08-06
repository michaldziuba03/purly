'use client';

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { IUseRecaptcha } from '../hooks/useRecaptcha';

interface IRecaptchaProps {
  recaptcha: IUseRecaptcha;
}

export const Recaptcha: React.FC<IRecaptchaProps> = ({ recaptcha }) => {
  return (
    <ReCAPTCHA
      ref={recaptcha.ref}
      size="invisible"
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT as string}
    />
  );
};
