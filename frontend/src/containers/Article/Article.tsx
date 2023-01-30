import { useAppSelector } from "@/store/reduxhooks";
import Image from "next/image";
import * as React from "react";
import { IArticle } from "types";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import ArticleDeleteModal from "@/components/Blog/ArticleDeleteModal";
import { deleteArticle } from "@/api/blogApi";

export interface IArticleProps {
   article: IArticle;
}

export default function Article(props: IArticleProps) {
   const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

   const router = useRouter();
   const authState = useAppSelector((state) => state.auth);

   const isAuthor = props.article.author_id === authState.authInfo.id;

   const editHandler = React.useCallback(() => {
      router.push(`/article/edit/${props.article.id}`);
   }, [router, props.article.id]);

   const deleteModalCloseHandler = React.useCallback(() => {
      setDeleteModalOpen(false);
   }, []);

   const deleteButtonHandler = React.useCallback(() => {
      setDeleteModalOpen(true);
   }, []);

   const deleteArticleHandler = React.useCallback(() => {
      deleteArticle(props.article.id);
      setDeleteModalOpen(false)
      router.push("/");
   }, [props.article.id, router]);

   return (
      <>
         <div className="w-7/12 p-5 mx-auto">
            <h1 className="text-center text-5xl mb-5 font-bold">
               {props.article.title}
            </h1>
            <div className="w-full h-[500px] relative">
               <Image
                  src={props.article.image}
                  alt={props.article.title}
                  fill
               />
            </div>
            <div className="mt-5">{props.article.content}</div>
            <div className="mt-3">
               {isAuthor && (
                  <div className="flex gap-4 justify-center">
                     <Button variant="outlined" size="large" color="primary" onClick={editHandler}>
                        Edit
                     </Button>
                     <Button
                        variant="outlined"
                        size="large"
                        color="warning"
                        onClick={deleteButtonHandler}
                     >
                        Delete
                     </Button>
                  </div>
               )}
            </div>
         </div>
         <ArticleDeleteModal
            open={deleteModalOpen}
            onCancel={deleteModalCloseHandler}
            onAgree={deleteArticleHandler}
            articleTitle={props.article.title}
         />
      </>
   );
}
