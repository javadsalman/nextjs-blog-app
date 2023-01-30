import * as React from 'react';
import { TextField, Button } from '@mui/material'

export interface IRegisterProps {
}

export default function Register(props: IRegisterProps) {
   return (
      <div className='w-5/12 mx-auto mt-28 bg-white flex flex-col justify-between gap-10 p-10 rounded'>
         <div className='text-black text-center text-3xl'>Register</div>
         <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth />
         <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth />
         <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth />
         <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth />
         <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type="password" />
         <Button variant="outlined" size="large">Register</Button>
      </div>
   );
}
