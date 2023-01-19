export default function CardWithHeader({
  children,
  header
}: {
  children: JSX.Element | JSX.Element[];
  header: string;
}) {
  return (
    <div className="bg-neutral-900 overflow-hidden shadow rounded-lg divide-y divide-neutral-700 mt-10">
      <div className="px-4 py-5 text-2xl sm:px-6">{header}</div>
      <div className="px-4 py-5 sm:px-6 py-3">{children}</div>
    </div>
  );
}
