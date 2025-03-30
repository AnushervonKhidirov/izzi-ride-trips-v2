import type { ResponseWithError } from '@type/common.type';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { CustomError } from '@type/error.type';

import { Token } from '@constant/request';
import { addCookies, getCookies } from '@helper/cookies.helper';

import { AuthService } from '@service/auth/auth.service';

export const requestWithRefresh = async <T>(
  request: () => ResponseWithError<T>,
  cookieStore?: ReadonlyRequestCookies,
): ResponseWithError<T> => {
  try {
    const [response, err] = await request();

    if (err) {
      if (err.status === parseInt(Token.ExpiredCode)) {
        const authService = new AuthService();
        let tokenRefresh: string | undefined;

        if (cookieStore) {
          tokenRefresh = cookieStore.get(Token.Refresh)?.value;
        } else {
          const cookies = getCookies();
          tokenRefresh = cookies.refresh_token;
        }

        if (!tokenRefresh) throw new Error();

        const [tokens, err] = await authService.refreshToken(tokenRefresh);
        if (err) throw err;

        if (cookieStore) {
          cookieStore.set(Token.Access, tokens.access_token);
          cookieStore.set(Token.Refresh, tokens.refresh_token);
        } else {
          addCookies(tokens);
        }

        const [response, requestErr] = await request();
        if (requestErr) throw requestErr;

        return [response, null];
      }

      throw err;
    }

    return [response, null];
  } catch (err) {
    if (err instanceof CustomError) return [null, err];
    return [null, new CustomError(400, 'Bad Request')];
  }
};
