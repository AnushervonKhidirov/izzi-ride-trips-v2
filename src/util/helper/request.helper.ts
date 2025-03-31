import type { ResponseWithError } from '@type/common.type';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import { Token } from '@constant/request';
import { addCookies, getCookies } from '@helper/cookies.helper';
import { HttpError, SimpleError } from '@error/http.error';
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
        const tokenRefresh = cookieStore ? cookieStore.get(Token.Refresh)?.value : getCookies(Token.Refresh);
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
    if (err instanceof HttpError) return [null, err];
    return [null, new SimpleError()];
  }
};
