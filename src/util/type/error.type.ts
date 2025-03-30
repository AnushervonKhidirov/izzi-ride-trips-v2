export type ErrorCustom<T> = {
  massage?: string;
  cause?: T;
};

export class CustomError {
  status: number;
  error: string;
  message?: string | string[];

  constructor(status: number, error: string, message?: string | string[]) {
    this.status = status;
    this.error = error;
    this.message = message;
  }
}
