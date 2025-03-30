import type { ResponseWithError } from '@type/common'
import type { TLogInData, TTokens, TUser } from '@type/auth'
import { CustomError } from '@type/error'

import { TResponse } from '@type/form'
import { Endpoint, Token } from '@constant/request'
import { addCookies, getCookies } from '@helper/cookies'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export const logIn = async (data: TLogInData): ResponseWithError<TTokens> => {
    try {
        const response = await fetch(Endpoint.LogIn, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new CustomError(response.status, response.statusText)
        }

        const responseBody = <TResponse<TTokens>>await response.json()
        const tokens = responseBody.data
        if (!tokens) throw new Error('')

        return [tokens, null]
    } catch (err) {
        if (err instanceof CustomError) return [null, err]
        return [null, new CustomError(400, 'Bad Request')]
    }
}

export const getUser = async (): ResponseWithError<TUser> => {
    try {
        const cookies = getCookies()
        if (!cookies.access_token) throw new Error()

        const response = await fetch(Endpoint.LogIn, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.access_token}`,
            },
        })

        if (response.status !== 200) {
            throw new CustomError(response.status, response.statusText)
        }

        const responseBody = <TResponse<TUser>>await response.json()
        const user = responseBody.data
        if (!user) throw new Error('')

        return [user, null]
    } catch (err) {
        if (err instanceof CustomError) return [null, err]
        return [null, new CustomError(400, 'Bad Request')]
    }
}

export const refreshToken = async (refreshToken: string): ResponseWithError<TTokens> => {
    try {
        const response = await fetch(Endpoint.RefreshToken, {
            method: 'POST',
            body: JSON.stringify({ token: refreshToken }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status !== 200) {
            throw new CustomError(response.status, response.statusText)
        }

        const responseBody = <TResponse<TTokens>>await response.json()
        const tokens = responseBody.data
        if (!tokens) throw new Error('')

        return [tokens, null]
    } catch (err) {
        if (err instanceof CustomError) return [null, err]
        return [null, new CustomError(400, 'Bad Request')]
    }
}

export const requestWithRefresh = async <T>(
    request: () => ResponseWithError<T>,
    cookieStore?: ReadonlyRequestCookies,
): ResponseWithError<T> => {
    try {
        const [response, err] = await request()

        if (err) {
            if (err.status === parseInt(Token.ExpiredCode)) {
                let tokenRefresh: string | undefined

                if (cookieStore) {
                    tokenRefresh = cookieStore.get(Token.Refresh)?.value
                } else {
                    const cookies = getCookies()
                    tokenRefresh = cookies.refresh_token
                }

                if (!tokenRefresh) throw new Error()

                const [tokens, err] = await refreshToken(tokenRefresh)
                if (err) throw err

                if (cookieStore) {
                    cookieStore.set(Token.Access, tokens.access_token)
                    cookieStore.set(Token.Refresh, tokens.refresh_token)
                } else {
                    addCookies(tokens)
                }

                const [response, requestErr] = await request()
                if (requestErr) throw requestErr

                return [response, null]
            }

            throw err
        }

        return [response, null]
    } catch (err) {
        if (err instanceof CustomError) return [null, err]
        return [null, new CustomError(400, 'Bad Request')]
    }
}
