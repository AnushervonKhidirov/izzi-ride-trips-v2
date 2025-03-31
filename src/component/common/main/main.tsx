'use client';
import type { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

const MainWithNotistack = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <SnackbarProvider style={{ fontSize: '1em' }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
      <main>{children}</main>
    </SnackbarProvider>
  );
};

export default MainWithNotistack;
