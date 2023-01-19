export default function CardWithFooter({
  children,
  footer
}: {
  children: JSX.Element | JSX.Element[];
  footer: JSX.Element;
}) {
  return (
    <div className="bg-neutral-800 overflow-hidden shadow rounded-lg divide-y divide-neutral-200">
      <div className="px-4 py-5 sm:p-6">{children}</div>
      <div className="px-4 py-4 sm:px-6">{footer}</div>
    </div>
  );
}
