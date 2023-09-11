'use client';

import { Copy, HelpCircle, PlusCircle } from 'lucide-react';
import { DeviceMockup } from '../../../../components/device';
import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';
import { Button } from '../../../../components/button';
import { BioLink } from './bio-link';
import { copyToClipboard } from '../../../../lib/clipboard';
import { useToast } from '../../../../hooks/useToast';
import { useState } from 'react';
import { AddElementForm } from './add-element-form';
import { Launchpad } from '../../../m/[slug]/launchpad';

interface ILaunchpadProps {
  id: string;
  slug: string;
  elements: Array<any>;
}

export function ShowLaunchpadView(props: ILaunchpadProps) {
  const link = `http://localhost:4200/m/${props.slug}`;
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function copyPageLink() {
    try {
      await copyToClipboard(link);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return toast({
        title: 'Purly page link copied to clipboard',
      });
    } catch {
      return toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  }

  return (
    <PageWrapper className="flex justify-center">
      <div className="relative w-full justify-between flex max-w-7xl gap-32 h-full">
        <div className="w-full">
          <H2>Link in Bio</H2>
          <div className="flex justify-between items-center text-sm w-full my-4 p-4 bg-blue-100 rounded">
            <span className="flex items-center font-semibold">
              <HelpCircle className="w-4 h-4 mr-2" />
              Your Purly page is live:&nbsp;
              <a className="font-normal underline" href={link}>
                {link}
              </a>
            </span>

            <Button
              onClick={copyPageLink}
              variant="outline"
              className="bg-white border-blue-50 text-blue-700 hover:text-blue-900"
            >
              <Copy className="w-4 h-4 mr-2" />
              {isCopied ? 'Copied' : 'Copy URL'}
            </Button>
          </div>

          <div className="flex gap-4">
            <a className="border-b-primary border-b-2 border-collapse">
              <Button className="font-semibold" variant="ghost">
                Links
              </Button>
            </a>
            <Button variant="ghost">Appearance</Button>
          </div>

          <div className="mt-8">
            <Button onClick={() => setShowForm(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a link
            </Button>

            <div className="py-8 flex flex-col gap-4">
              {showForm && <AddElementForm setShowForm={setShowForm} />}
              {!props.elements.length && !showForm && 'No links :('}
              {props.elements.map((element: any) => (
                <BioLink key={element.id} {...element} />
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-4 h-[760px]">
          <DeviceMockup>
            <div className="h-full overflow-y-auto no-scrollbar">
              <Launchpad isPreview {...props} />
            </div>
          </DeviceMockup>
        </div>
      </div>
    </PageWrapper>
  );
}
