import Navbar from '@/components/Navbar/Navbar';
import { useAppDispatch, useAppSelector } from '@/store/reduxhooks';
import { checkLoginAction } from '@/store/slices/authSlice';
import * as React from 'react';

export interface ILayoutProps {
    children: React.ReactNode;
}

export default function Layout (props: ILayoutProps) {

  const dispatch = useAppDispatch()
  const authState = useAppSelector(state => state.auth)
  console.log(authState)

  React.useEffect(() => {
    dispatch(checkLoginAction())
  }, [dispatch])


  return (
    <div>
      <div><Navbar /></div>
      <div>
        {props.children}
      </div>
    </div>
  );
}
