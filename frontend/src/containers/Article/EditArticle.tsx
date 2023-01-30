import * as React from 'react';
import { TextField, Button } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image';
import { createArticle, getArticleDetail, updateArticle } from '@/api/blogApi';
import { useRouter } from 'next/router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export interface IEditArticleProps {
}

const pattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i

export default function EditArticle(props: IEditArticleProps) {
   const [image, setImage] = React.useState<string>('');
   const [validImage, setValidImage] = React.useState<boolean>(false);
   const [title, setTitle] = React.useState<string>('');
   const [content, setContent] = React.useState<string>('');

   const router = useRouter();

   const { id } = router.query;

   React.useEffect(() => {
      if (id) {
         getArticleDetail(+id).then((response) => {
               setTitle(response.data.title);
               setImage(response.data.image);
               setContent(response.data.content);
               setValidImage(true);
            }
         )
      }
   }, [id])

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
      updateArticle(+id!, title, image, content).then(() => {
         setTitle('');
         setImage('');
         setContent('');
         setValidImage(false);
      });
   }, [id, title, image, content]);
   
   return (
      <div className='w-7/12 mx-auto my-10 p-5'>
         <ThemeProvider theme={darkTheme}>
            {validImage && <Image src={image} alt={title} width={500} height={300} />}
            <form className='flex flex-col gap-5' onSubmit={submitHandler}>
               <div><TextField placeholder='Title' fullWidth value={title} onChange={changeTitleHandler} /></div>
               <div><TextField placeholder='Image URL' fullWidth value={image} onChange={changeImageHandler} /></div>
               <div><TextField placeholder='Content' fullWidth multiline value={content} onChange={changeContentHandler} /></div>
               <Button variant="outlined" size="large" color="info" type="submit">Edit Article</Button>
            </form>
         </ThemeProvider>
      </div>
   );
}

// regex pattern to validate url

