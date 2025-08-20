import { type ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="container max-w-7xl mx-auto p-4 min-h-[calc(100vh-70px)]">

      {children}
    </div>
  );
}