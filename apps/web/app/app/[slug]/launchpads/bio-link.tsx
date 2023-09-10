import { Trash, Edit, GripVertical } from 'lucide-react';
import { Button } from '../../../../components/button';
import { RemoveElementAlert } from './remove-element-alert';

interface BioLinkProps {
  id: string;
  label: string;
  redirect: string;
}

export function BioLink(props: BioLinkProps) {
  return (
    <div className="flex items-center w-full rounded-lg bg-white">
      <GripVertical className="ml-3 text-muted-foreground cursor-grab" />
      <div className="w-full flex justify-between p-8">
        <div className="flex flex-col">
          <span className="font-bold">{props.label}</span>
          <span className="text-sm">{props.redirect}</span>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <RemoveElementAlert elementId={props.id}>
            <Button variant="secondary">
              <Trash className="w-4 h-4" />
            </Button>
          </RemoveElementAlert>
        </div>
      </div>
    </div>
  );
}
