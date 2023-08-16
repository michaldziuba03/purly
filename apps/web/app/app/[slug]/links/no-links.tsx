import { H4 } from '../../../../components/typography';
import React from 'react';
import { PlusCircle, Unlink } from 'lucide-react';
import { Button } from '../../../../components/button';

export function NoLinksFound() {
  return (
    <div className="mt-20 text-gray-500 w-full h-full gap-4 flex flex-col justify-center items-center">
      <Unlink className="w-32 h-32 mb-4" />
      <H4>You don&apos;t have any links.</H4>

      <Button className="mt-4">
        <PlusCircle className="mr-3 w-5 h-5" />
        Create Link
      </Button>
    </div>
  );
}
