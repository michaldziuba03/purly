import { H2 } from '../../../../components/typography';
import { PageWrapper } from '../../page-wrapper';

export const metadata = {
  title: 'Link in Bio | Purly',
  description: 'Purly platform',
};

export default function LaunchpadsPage() {
  return (
    <PageWrapper>
      <div className="flex pb-4 border-b justify-between items-center">
        <H2>Link in Bio</H2>
      </div>
    </PageWrapper>
  );
}
