'use client';

import { useState } from 'react';
import { H3 } from '../../../../../components/typography';
import { useAuth } from '../../../../../lib/auth';
import { Button } from '../../../../../components/button';
import { Trash, UploadCloud } from 'lucide-react';
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

export default function AccountSettingsPage() {
  const { user, setUser } = useAuth();
  const [picturePreview, setPicturePreview] = useState(user.picture);

  function changeAvatar() {
    const fileInput = document.getElementById('avatar-file');
    fileInput?.click();
  }

  function onFile(e: any) {
    setPicturePreview(URL.createObjectURL(e.target.files[0]));
  }

  function discardPicture() {
    setPicturePreview(user.picture);
  }

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

  return (
    <div>
      <H3>Account</H3>
      <span>Username and avatar settings</span>
      <div className="flex flex-col w-full mt-8 gap-8">
        <input
          onChange={onFile}
          id="avatar-file"
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/jpg"
        />
        <button
          onClick={changeAvatar}
          className="group w-32 h-32 bg-black rounded-full relative"
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
      </div>
      {picturePreview !== user.picture && (
        <div className="mt-4 flex gap-2">
          <Button onClick={savePicture}>Save picture</Button>
          <Button onClick={discardPicture} variant="destructive">
            <Trash className="w-4 h-4 mr-2" /> Discard picture
          </Button>
        </div>
      )}
    </div>
  );
}
