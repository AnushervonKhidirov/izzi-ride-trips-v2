import { Endpoint } from '@constant/request';
import { TLogInData, TTokens } from '@type/auth.type';
import { ResponseWithError } from '@type/common.type';
import { CustomError } from '@type/error.type';
import { TResponse } from '@type/form.type';

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
        throw new CustomError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TTokens>>await response.json();
      const tokens = responseBody.data;
      if (!tokens) throw new Error('');

      return [tokens, null];
    } catch (err) {
      if (err instanceof CustomError) return [null, err];
      return [null, new CustomError(400, 'Bad Request')];
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
        throw new CustomError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TTokens>>await response.json();
      const tokens = responseBody.data;
      if (!tokens) throw new Error('');

      return [tokens, null];
    } catch (err) {
      if (err instanceof CustomError) return [null, err];
      return [null, new CustomError(400, 'Bad Request')];
    }
  }
}
