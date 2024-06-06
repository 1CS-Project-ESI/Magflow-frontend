import { ReactNode } from 'react';

function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:ml-60 sm:border-r bg-zinc-100 min-h-screen">
      {children}
    </div>
  );
}
export default MarginWidthWrapper;