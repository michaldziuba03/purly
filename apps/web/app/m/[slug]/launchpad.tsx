import { cn } from '../../../lib/utils';

interface ILaunchpadProps {
  isPreview: boolean;
  id: string;
  title: string;
  description?: string;
  elements: Array<{ id: string; label: string; redirect: string }>;
  bgColor: string;
  textColor: string;
  btnColor: string;
  btnTextColor: string;
}

export function Launchpad(props: ILaunchpadProps) {
  return (
    <div
      style={{ backgroundColor: props.bgColor }}
      className={cn(
        'flex justify-center w-full',
        props.isPreview ? 'h-full' : 'min-h-screen'
      )}
    >
      <main
        className={cn(
          'max-w-3xl w-full py-16 px-4',
          props.isPreview ? undefined : 'md:py-32'
        )}
      >
        <div style={{ color: props.textColor }} className="w-full text-center">
          <h1 className="font-bold text-lg">{props.title}</h1>
          <span>{props.description}</span>
        </div>
        <div className="mt-8 w-full flex flex-col gap-4">
          {props.elements.map((element) => (
            <BioButton
              btnColor={props.btnColor}
              btnTextColor={props.btnTextColor}
              key={element.id}
              {...element}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export function BioButton(props: {
  label: string;
  redirect: string;
  btnColor: string;
  btnTextColor: string;
}) {
  return (
    <a
      style={{ backgroundColor: props.btnColor, color: props.btnTextColor }}
      href={props.redirect}
      className="w-full p-4 rounded-full text-center font-semibold"
    >
      {props.label}
    </a>
  );
}
