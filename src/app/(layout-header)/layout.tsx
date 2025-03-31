import type { ReactNode } from 'react';

import { CookiesProvider } from 'next-client-cookies/server';
import Header from '@common/header/header';
import MainWithNotistack from '@common/main/main';

const HeaderLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <CookiesProvider>
      <Header />
      <MainWithNotistack>{children}</MainWithNotistack>
    </CookiesProvider>
  );
};

export default HeaderLayout;
