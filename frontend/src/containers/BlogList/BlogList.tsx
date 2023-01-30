import BlogItem from '@/components/Blog/BlogItem';
import * as React from 'react';
import { ArticleListType } from 'types';

export interface IBlogListProps {
  articleList: ArticleListType
}

export default function BlogList (props: IBlogListProps) {
  return (
    <div className='w-6/12 mx-auto'>
      {props.articleList.map(article => {
        return (
          <BlogItem key={article.id} article={article} />
        )
      })}
    </div>
  );
}
