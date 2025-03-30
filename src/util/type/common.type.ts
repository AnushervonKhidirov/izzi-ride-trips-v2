import type { HTMLAttributes, PropsWithChildren } from 'react';
import { CustomError } from './error.type';

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

export type ResponseWithError<T = {}> = Promise<[T, null] | [null, CustomError]>;

export type TResponse<T = {}> = {
  code: number;
  show_custom_message: boolean;
  message: string;
  data?: T;
};
