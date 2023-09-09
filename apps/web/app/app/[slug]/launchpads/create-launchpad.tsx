import { PageWrapper } from '../../page-wrapper';
import { CreateLaunchpadForm } from './create-launchpad-form';

export default function CreateLaunchpadView() {
  return (
    <PageWrapper className="bg-white">
      <div className="w-full">
        <div className="mt-12 flex flex-col items-center justify-center">
          <h1 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Showcase your links
          </h1>
          <span className="max-w-xl text-center">
            Create one beautiful page to share and manage all the links that
            matter to you. It doesn&apos;t matter if you are creator or
            bussiness. <a className="text-blue-700">Learn more</a>
          </span>

          <div className="w-full max-w-4xl mt-16 flex flex-col gap-2 items-center">
            <div className="w-full justify-start">
              <span className="text-start text-sm font-bold">
                Claim your Link-in-bio URL
              </span>
            </div>
            <CreateLaunchpadForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
