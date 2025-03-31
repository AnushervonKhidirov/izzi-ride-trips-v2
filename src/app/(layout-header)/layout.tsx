import type { ReactNode } from 'react';

import { CookiesProvider } from 'next-client-cookies/server';
import Header from '@common/header/header';

const HeaderLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <CookiesProvider>
      <Header />
      <main>{children}</main>
    </CookiesProvider>
  );
};

export default HeaderLayout;
