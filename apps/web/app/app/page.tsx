import { Header } from './header';
import { Sidebar } from './sidebar';

const AppPage = () => {
  return (
    <div className="w-full grid grid-cols-7">
      <Sidebar />
      <div className="col-span-6 border-l">
        <Header />
        <div className="h-screen px-4 py-6 lg:px-8 border-t bg-muted"></div>
      </div>
    </div>
  );
};

export default AppPage;
