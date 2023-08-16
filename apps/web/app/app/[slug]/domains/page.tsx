import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';

export const metadata = {
  title: 'Domains | Purly',
  description: 'Purly platform',
};

export default function DomainsPage() {
  return (
    <PageWrapper>
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Domains</H2>
      </div>
    </PageWrapper>
  );
}
