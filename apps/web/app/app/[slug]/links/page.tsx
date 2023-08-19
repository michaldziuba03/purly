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
    <PageWrapper>
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Links</H2>
        <CreateLinkModal>
          <Button>
            <PlusCircle className="mr-3 w-5 h-5" />
            Create Link
          </Button>
        </CreateLinkModal>
      </div>
      <div className="pt-10 pb-10 space-y-6">
        <Links />
      </div>
    </PageWrapper>
  );
}
