export class HttpError {
  status: number;
  error: string;
  message?: string | string[];

  constructor(status: number, error: string, message?: string | string[]) {
    this.status = status;
    this.error = error;
    this.message = message;
  }
}

export class SimpleError extends HttpError {
  constructor(message?: string | string[]) {
    super(0, '', message ?? 'Something went wrong, please try again later!');
  }
}
