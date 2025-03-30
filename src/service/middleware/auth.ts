import type { NextMiddleware } from 'next/server'

import { cookies } from 'next/headers'
import { getUser, requestWithRefresh } from '@/util/requests/request'
import { Headers } from '@constant/headers'
import { Token } from '../../util/constant/request'

export function authMiddleware(nextMiddleware: NextMiddleware): NextMiddleware {
    return async (request, event) => {
        const cookieStore = await cookies()

        const access_token = cookieStore.get(Token.Access)?.value
        const refresh_token = cookieStore.get(Token.Refresh)?.value

        if (access_token && refresh_token) {
            const [user, err] = await requestWithRefresh(() => getUser(cookieStore), cookieStore)

            if (!err) request.headers.set(Headers.User, JSON.stringify(user))
        }

        return nextMiddleware(request, event)
    }
}
