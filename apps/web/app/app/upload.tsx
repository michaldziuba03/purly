'use client';

import React from 'react';

interface IUploadProviderProps {
  id: string;
}

export function UploadProvider(props: IUploadProviderProps) {
  function handleOnFile(e: { target: HTMLInputElement }) {
    const file = e.target.files?.item(0);
  }

  return (
    <>
      <input
        id={props.id}
        type="file"
        className="hidden"
        onChange={handleOnFile}
      />
    </>
  );
}
