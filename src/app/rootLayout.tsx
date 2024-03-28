import '../styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/headers/header';
import HeaderMobile from '@/components/headers/header-mobile';
import MarginWidthWrapper from '@/components/sidebar/margin-width-wrapper';
import PageWrapper from '@/components/sidebar/page-wrapper';
import SideNav from '@/components/sidebar/side-nav';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'MAGFLOW',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white${inter.className}`}>
        <div className="flex">
          <SideNav />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile />
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}