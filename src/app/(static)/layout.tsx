// Lib Imports
import { ReactNode } from 'react';

// Components
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Component
export default function StaticLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
