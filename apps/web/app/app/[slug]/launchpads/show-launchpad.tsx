import { Copy, HelpCircle, PlusCircle } from 'lucide-react';
import { DeviceMockup } from '../../../../components/device';
import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';
import { Button } from '../../../../components/button';
import Link from 'next/link';
import { BioLink } from './bio-link';

interface ILaunchpadProps {
  slug: string;
}

export function ShowLaunchpadView(props: ILaunchpadProps) {
  const link = `http://localhost:4200/m/${props.slug}`;
  return (
    <PageWrapper className="flex justify-center">
      <div className="relative w-full justify-between flex max-w-7xl gap-24 h-full">
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
              variant="outline"
              className="bg-white border-blue-50 text-blue-700 hover:text-blue-900"
            >
              <Copy className="w-4 h-4 mr-2" /> Copy URL
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
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a link
            </Button>

            <div className="py-8 flex flex-col gap-4">
              <BioLink />
              <BioLink />
            </div>
          </div>
        </div>
        <div className="sticky top-4 h-[760px]">
          <DeviceMockup />
        </div>
      </div>
    </PageWrapper>
  );
}
