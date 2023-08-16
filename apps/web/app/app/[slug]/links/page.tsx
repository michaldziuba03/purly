import { Button } from '../../../../components/button';
import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';
import { Link } from './link';
import { PlusCircle } from 'lucide-react';

export const metadata = {
  title: 'Links | Purly',
  description: 'Purly platform',
};

export default function LinksPage() {
  return (
    <PageWrapper>
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Links</H2>
        <Button>
          <PlusCircle className="mr-3 w-5 h-5" />
          Create Link
        </Button>
      </div>
      <div className="py-8 space-y-6">
        <Link />
        <Link />
        <Link />
        <Link />
        <Link />
      </div>
    </PageWrapper>
  );
}
