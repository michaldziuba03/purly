import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';

export const metadata = {
  title: 'Members | Purly',
  description: 'Purly platform',
};

export default function MembersPage() {
  return (
    <PageWrapper>
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Members</H2>
      </div>
    </PageWrapper>
  );
}
