'use client';

import React, { useState } from 'react';
import { Trash, UploadCloud } from 'lucide-react';
import { useAuth } from '../../../../../lib/auth';
import { initUpload, uploadToS3 } from '../../../../../lib/api/upload';
import { setUserAvatar } from '../../../../../lib/api';

function getFormat(type: string): string {
  switch (type) {
    case 'image/png':
      return 'png';
    case 'image/jpg':
      return 'jpg';
    case 'image/jpeg':
      return 'jpeg';
    default:
      throw new Error('Unsupported format');
  }
}

function getFile(target: HTMLInputElement) {
  if (!target.files) {
    return null;
  }

  if (!target.files.length) {
    return null;
  }

  return target.files[0];
}

type IAvatarUploadProps = React.ComponentProps<'input'> & {
  defaultImage: string;
};

export function AvatarUpload(props: IAvatarUploadProps) {
  const [picturePreview, setPicturePreview] = useState(props.defaultImage);

  function changeAvatar() {
    const fileInput = document.getElementById('avatar-file');
    fileInput?.click();
  }

  function onFile(e: any) {
    if (!props.onChange) return;
    const file = getFile(e.target);
    if (!file) {
      return;
    }

    props.onChange(file as any);
    setPicturePreview(URL.createObjectURL(file));
  }

  function discardPicture() {
    if (!props.onChange) return;
    setPicturePreview(props.defaultImage);
    props.onChange(null as any);
  }

  /*
  async function savePicture() {
    const fileInput = document.getElementById(
      'avatar-file'
    ) as HTMLInputElement;
    const file = fileInput.files![0];

    const format = getFormat(file.type);
    const signed = await initUpload(format);
    const form = new FormData();

    Object.entries(signed.fields).forEach(([field, value]) => {
      form.append(field, value as string);
    });

    form.append('file', file);
    await uploadToS3(signed.url, form);
    const userData = await setUserAvatar(signed.file);

    setUser(userData);
    setPicturePreview(userData.picture);
  }
  */
  return (
    <>
      <input
        {...props}
        onChange={onFile}
        value={(props.value as any)?.filename}
        id="avatar-file"
        type="file"
        className="hidden"
        accept="image/jpeg, image/png, image/jpg"
      />
      <div className="relative w-max">
        <button
          type="button"
          onClick={changeAvatar}
          className="group w-28 h-28 bg-black rounded-full relative"
        >
          <div className="flex flex-col opacity-0 group-hover:opacity-100 bg-opacity-60 transition-opacity items-center justify-center text-white w-full h-full absolute bg-black rounded-full">
            <UploadCloud className="w-5 h-5" />
            <div className="text-xs font-bold">Change avatar</div>
          </div>
          <img
            className="w-full h-full rounded-full"
            src={picturePreview}
            alt="profile"
          />
        </button>

        {picturePreview !== props.defaultImage && (
          <button
            type="button"
            className="p-3 bg-muted border hover:bg-slate-200 top-0 right-0 shadow-sm absolute rounded-full translate-x-1/2"
            onClick={discardPicture}
          >
            <Trash className="w-4 h-4" />
          </button>
        )}
      </div>
    </>
  );
}
