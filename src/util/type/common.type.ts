import type { HTMLAttributes, PropsWithChildren } from 'react';
import { HttpError } from '@error/http.error';

export type AdditionalProps<T = {}> = T &
  PropsWithChildren & {
    className?: string;
  };

export type TProperty = {
  name: string;
  value: string | number;
};

export type TChip = {
  name: string;
  value: boolean;
};

export type TStyles = HTMLAttributes<HTMLElement>['style'];

export type ResponseWithError<T = {}> = Promise<[T, null] | [null, HttpError]>;

export type TResponse<T = {}> = {
  code: number;
  show_custom_message: boolean;
  message: string;
  data?: T;
};
