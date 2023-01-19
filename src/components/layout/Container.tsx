export default function Container({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <div className="max-w-full mb-auto sm:px-6 lg:px-8">{children}</div>;
}
