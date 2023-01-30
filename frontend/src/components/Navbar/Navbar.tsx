import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAppDispatch, useAppSelector } from '@/store/reduxhooks';
import { Button } from '@mui/material';
import Link from 'next/link';
import { logoutAction } from '@/store/slices/authSlice';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const authState = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = React.useCallback(() => {
    dispatch(logoutAction())
    router.push('/auth/login')
  }, [dispatch, router])

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              Blog
            </Link>
          </Typography>
          {auth && (
            <div>
              {
                authState.loginStatus === 'loggedIn'
                ?
                <>
                <Link href="/article/add">
                  <Button color="inherit">Add Article</Button>
                </Link>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                
                </>
                :
                <>
                  <Link href="auth/login/"><Button color="inherit">Login</Button></Link>
                  <Link href="auth/register/"><Button color="inherit">Register</Button></Link>
                </>
              }
            </div>
          )}
        </Toolbar>
      </AppBar>
  )
}