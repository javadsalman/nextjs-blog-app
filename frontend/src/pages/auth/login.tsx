import Login from '@/containers/Auth/Login/Login';
import Head from 'next/head';
import * as React from 'react';

export interface ILoginPageProps {
}

export default function LoginPage (props: ILoginPageProps) {
  return (
    <>
    <Head>
      <meta name="description" content="Login Olun" />
      <title>Login</title>
    </Head>
    <Login />
    </>
  );
}
