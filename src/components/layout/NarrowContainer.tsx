export default function NarrowContainer({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="max-w-7xl mb-auto mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  );
}
