import { Button } from '../../components/button';
import { Separator } from '../../components/separator';
import { Link, Settings, Users, Globe, Home, LayoutGrid } from 'lucide-react';
import { WorkspacesDropdown } from './workspaces-dropdown';

export function Sidebar() {
  return (
    <div className="pb-6 flex flex-col justify-between">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 space-y-4">
          <WorkspacesDropdown />
          <Separator />
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Workspace
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Link className="mr-2 h-4 w-4" />
              Links
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Link in Bio
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button disabled variant="ghost" className="w-full justify-start">
              <Globe className="mr-2 h-4 w-4" />
              Domains
            </Button>
            <div className="py-2">
              <Separator />
            </div>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center">
        Support • Docs • Feedback
      </div>
    </div>
  );
}
