'use client';
import type { FC } from 'react';
import { SnackbarProvider } from 'notistack';
import { AdditionalProps } from '@type/common.type';

const AlertProvider: FC<AdditionalProps<{ id?: string }>> = ({ children, className, id }) => {
  return (
    <SnackbarProvider style={{ fontSize: '1em' }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
      {children}
    </SnackbarProvider>
  );
};

export default AlertProvider;
