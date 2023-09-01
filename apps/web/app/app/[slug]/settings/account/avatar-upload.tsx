'use client';

import React, { useMemo } from 'react';
import { Trash, UploadCloud } from 'lucide-react';
import { useWatch } from 'react-hook-form';

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

export function AvatarUpload({ defaultImage, ...props }: IAvatarUploadProps) {
  const avatarFile = useWatch({ name: 'avatarFile' });
  const picturePreview = useMemo(() => {
    if (avatarFile) {
      return URL.createObjectURL(avatarFile);
    }

    return defaultImage;
  }, [avatarFile, defaultImage]);

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
  }

  function discardPicture() {
    if (!props.onChange) return;
    props.onChange(null as any);
  }

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

        {picturePreview !== defaultImage && (
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
