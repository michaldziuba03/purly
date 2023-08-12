import { Button } from '../../components/button';
import { H2 } from '../../components/typography';
import { Header } from './header';
import { Link } from './link';
import { Sidebar } from './sidebar';
import { PlusCircle } from 'lucide-react';

const AppPage = () => {
  return (
    <div className="w-full grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 border-l bg-muted max-h-screen overflow-hidden">
        <Header />
        <div className="p-10 border-t overflow-y-auto h-screen">
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
        </div>
      </div>
    </div>
  );
};

export default AppPage;
