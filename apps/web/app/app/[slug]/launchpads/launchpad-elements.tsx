import { PlusCircle } from 'lucide-react';
import { Button } from '../../../../components/button';
import { AddElementForm } from './add-element-form';
import { BioLink } from './bio-link';
import { useState } from 'react';

export function LaunchpadElements(props: any) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mt-8">
      <Button onClick={() => setShowForm(true)}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Add a link
      </Button>

      <div className="py-8 flex flex-col gap-4">
        {showForm && <AddElementForm setShowForm={setShowForm} />}
        {!props.elements.length && !showForm && 'No links :('}
        {props.elements.map((element: any) => (
          <BioLink key={element.id} {...element} />
        ))}
      </div>
    </div>
  );
}
