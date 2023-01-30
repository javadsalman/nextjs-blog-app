import { getArticleDetail } from '@/api/blogApi';
import Article from '@/containers/Article/Article';
import { GetStaticProps } from 'next';
import * as React from 'react';
import { IArticle } from 'types';

export interface IArticleDetailPageProps {
  article?: IArticle
}

export default function ArticleDetailPage (props: IArticleDetailPageProps) {
  
  if (!props.article) {
    return <div>Loading...</div>
  }

  return (
    <Article article={props.article} />
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      // { params: { id: '3' } },
    ],
    fallback: true,
  }
}


type contextType = {id: string}
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as contextType;
  const response = await getArticleDetail(+id);
  const article = response.data;
  return {
    props: {
      article
    },
    revalidate: 3600,
  }
}