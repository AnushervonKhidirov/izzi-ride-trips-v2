import type { TLogInData, TTokens } from '@type/auth.type';
import type { ResponseWithError, TResponse } from '@type/common.type';

import { Endpoint } from '@constant/request';
import { HttpError, SimpleError } from '@error/http.error';

export class AuthService {
  async logIn(data: TLogInData): ResponseWithError<TTokens> {
    try {
      const response = await fetch(Endpoint.LogIn, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new HttpError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TTokens>>await response.json();
      const tokens = responseBody.data;
      if (!tokens) throw new Error();

      return [tokens, null];
    } catch (err) {
      if (err instanceof HttpError) return [null, err];
      return [null, new SimpleError()];
    }
  }

  async refreshToken(refreshToken: string): ResponseWithError<TTokens> {
    try {
      const response = await fetch(Endpoint.RefreshToken, {
        method: 'POST',
        body: JSON.stringify({ token: refreshToken }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new HttpError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TTokens>>await response.json();
      const tokens = responseBody.data;
      if (!tokens) throw new Error('');

      return [tokens, null];
    } catch (err) {
      if (err instanceof HttpError) return [null, err];
      return [null, new SimpleError()];
    }
  }
}
