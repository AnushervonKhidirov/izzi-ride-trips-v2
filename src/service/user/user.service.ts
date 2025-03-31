import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { ResponseWithError, TResponse } from '@type/common.type';
import type { TUser } from '@type/user.type';

import { Endpoint, Token } from '@constant/request';
import { getCookies } from '@helper/cookies.helper';
import { HttpError, SimpleError } from '@error/http.error';

export class UserService {
  async getUser(cookieStore?: ReadonlyRequestCookies): ResponseWithError<TUser> {
    try {
      let accessToken: string | undefined;

      if (cookieStore) {
        accessToken = cookieStore.get(Token.Access)?.value;
      } else {
        const cookies = getCookies();
        accessToken = cookies.access_token;
      }

      const response = await fetch(Endpoint.UserInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        throw new HttpError(response.status, response.statusText);
      }

      const responseBody = <TResponse<TUser>>await response.json();
      const user = responseBody.data;

      if (!user) throw new Error();

      return [user, null];
    } catch (err) {
      if (err instanceof HttpError) return [null, err];
      return [null, new SimpleError()];
    }
  }
}
