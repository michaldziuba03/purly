import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/card';
import { CreateWorkspaceForm } from './create-workspace-form';

export function CreateFirstWorkspace() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create a first workspace</CardTitle>
          <CardDescription>
            Workspaces are containers for your links, statistics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateWorkspaceForm />
        </CardContent>
      </Card>
    </div>
  );
}
