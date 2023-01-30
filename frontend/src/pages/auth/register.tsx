import Login from '@/containers/Auth/Login/Login';
import Register from '@/containers/Auth/Register/Register';
import * as React from 'react';

export interface IRegisterPageProps {
}

export default function RegisterPage (props: IRegisterPageProps) {
  return (
    <Register />
  );
}
