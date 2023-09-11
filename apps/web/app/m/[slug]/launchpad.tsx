interface ILaunchpadProps {
  id: string;
  elements: Array<{ id: string; label: string; redirect: string }>;
}

export function Launchpad(props: ILaunchpadProps) {
  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-100">
      <main className="max-w-3xl w-full md:py-32 py-16 px-4">
        <div className="w-full text-center">
          <h1 className="font-bold">Title</h1>
        </div>
        <div className="mt-8 w-full flex flex-col gap-4">
          {props.elements.map((element) => (
            <BioButton key={element.id} {...element} />
          ))}
        </div>
      </main>
    </div>
  );
}

export function BioButton(props: { label: string; redirect: string }) {
  return (
    <a
      href={props.redirect}
      className="w-full p-4 bg-gray-300 rounded-full text-center font-semibold"
    >
      {props.label}
    </a>
  );
}
