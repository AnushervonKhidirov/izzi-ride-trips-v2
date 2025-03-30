'use client'
import type { FormEvent } from 'react'
import type { TLogInData } from '@type/auth'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logIn } from '@/util/requests/request'

import { FormBtn } from '@common/button/button'
import { addCookies } from '@helper/cookies'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { PasswordInput } from '@common/input/input'

const LogIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const body = Object.fromEntries(formData) as TLogInData

        const [tokens, err] = await logIn(body)

        console.log(err);
        console.log(tokens);
        

        setLoading(false)

        if (err) {
            alert(err.error)
        } else {
            addCookies(tokens)
            router.push('/')
        }
    }

    return (
        <main id="log-in-page">
            <div className="form_overlay">
                <h1>Log In</h1>

                <form onSubmit={onSubmit}>
                    <FormControl>
                        <InputLabel htmlFor="login" style={{ fontSize: '1em' }}>
                            Login *
                        </InputLabel>
                        <OutlinedInput name="login" required label="login" style={{ fontSize: '1em' }} />
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="password" style={{ fontSize: '1em' }}>
                            Password *
                        </InputLabel>
                        <PasswordInput name="password" required label="Password" style={{ fontSize: '1em' }} />
                    </FormControl>

                    <FormBtn loading={loading} title="Log in" />
                </form>
            </div>
        </main>
    )
}

export default LogIn
