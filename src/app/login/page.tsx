'use client';
import type { FormEvent } from 'react';
import type { TLogInData } from '@type/auth.type';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { FormBtn } from '@common/button/button';
import { addCookies } from '@helper/cookies.helper';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { PasswordInput } from '@common/input/input';
import { AuthService } from '@service/auth/auth.service';
import { useSnackbar } from 'notistack';
import Alert from '@common/alert/alert';

const LogIn = () => {
  const authService = new AuthService();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData) as TLogInData;

    const [tokens, err] = await authService.logIn(body);

    setLoading(false);

    if (err) {
      enqueueSnackbar(<Alert status={err.status} title={err.error} message={err.message} />, {
        variant: 'error',
      });
    } else {
      addCookies(tokens);
      router.push('/');
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
  );
};

export default LogIn;
