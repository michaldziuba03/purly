import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';

export const metadata = {
  title: 'Dashboard | Purly',
  description: 'Purly platform',
};

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Home</H2>
      </div>
    </PageWrapper>
  );
}
