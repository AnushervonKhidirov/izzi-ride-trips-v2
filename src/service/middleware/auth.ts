import type { NextMiddleware } from 'next/server';
import { cookies } from 'next/headers';
import { requestWithRefresh } from '@helper/request.helper';
import { Headers } from '@constant/headers';
import { Token } from '@constant/request';
import { UserService } from '@service/user/user.service';

export function authMiddleware(nextMiddleware: NextMiddleware): NextMiddleware {
  return async (request, event) => {
    const userService = new UserService();
    const cookieStore = await cookies();

    const access_token = cookieStore.get(Token.Access)?.value;
    const refresh_token = cookieStore.get(Token.Refresh)?.value;

    if (access_token && refresh_token) {
      const [user, err] = await requestWithRefresh(() => userService.getUser(cookieStore), cookieStore);

      if (!err) request.headers.set(Headers.User, JSON.stringify(user));
    }

    return nextMiddleware(request, event);
  };
}
