import { Trash, Edit, GripVertical } from 'lucide-react';
import { Button } from '../../../../components/button';

export function BioLink() {
  return (
    <div className="flex items-center w-full rounded-lg bg-white">
      <GripVertical className="ml-3 text-muted-foreground cursor-grab" />
      <div className="w-full flex justify-between p-8">
        <div className="flex flex-col">
          <span className="font-bold">My link</span>
          <span className="text-sm">http://localhost:4200/XyZP0</span>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="secondary">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
