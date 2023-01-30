import * as React from 'react';
import { TextField, Button } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import { createArticle } from '@/api/blogApi';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export interface IAddARticleProps {
}

const pattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i

export default function AddARticle(props: IAddARticleProps) {
   const [image, setImage] = React.useState<string>('');
   const [validImage, setValidImage] = React.useState<boolean>(false);
   const [title, setTitle] = React.useState<string>('');
   const [content, setContent] = React.useState<string>('');

   const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
   }

   const changeContentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
   }

   const changeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImage(e.target.value);
      
      setValidImage(pattern.test(e.target.value) && e.target.value.includes('upload.wikimedia.org'));
   }

   const submitHandler = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createArticle(title, image, content).then(() => {
         setTitle('');
         setImage('');
         setContent('');
         setValidImage(false);
      });
   }, [title, image, content]);
   
   return (
      <div className='w-7/12 mx-auto my-10 p-5'>
         <ThemeProvider theme={darkTheme}>
            {validImage && <Image src={image} alt={title} width={500} height={300} />}
            <form className='flex flex-col gap-5' onSubmit={submitHandler}>
               <div><TextField placeholder='Title' fullWidth value={title} onChange={changeTitleHandler} /></div>
               <div><TextField placeholder='Image URL' fullWidth value={image} onChange={changeImageHandler} /></div>
               <div><TextField placeholder='Content' fullWidth multiline value={content} onChange={changeContentHandler} /></div>
               <Button variant="outlined" size="large" color="info" type="submit">Add Article</Button>
            </form>
         </ThemeProvider>
      </div>
   );
}

// regex pattern to validate url

