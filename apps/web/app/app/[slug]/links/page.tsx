import { Button } from '../../../../components/button';
import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';
import { PlusCircle } from 'lucide-react';
import { Links } from './links';
import { CreateLinkModal } from './create-link-modal';

export const metadata = {
  title: 'Links | Purly',
  description: 'Purly platform',
};

export default function LinksPage() {
  return (
    <PageWrapper className="flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="flex pb-4 border-b justify-between items-center">
          <H2>Links</H2>
          <CreateLinkModal>
            <Button>
              <PlusCircle className="mr-3 w-5 h-5" />
              Create Link
            </Button>
          </CreateLinkModal>
        </div>
        <div className="py-8 space-y-6">
          <Links />
        </div>
      </div>
    </PageWrapper>
  );
}
