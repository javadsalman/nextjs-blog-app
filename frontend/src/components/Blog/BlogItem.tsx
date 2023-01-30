import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { IArticle } from 'types';

export interface IBlogItemProps {
    article: IArticle
}

export default function BlogItem(props: IBlogItemProps) {

    const router = useRouter();

    const clickHandler = () => {
        router.push(`/article/${props.article.id}`)
    }

    return (
        <div className='mt-16 cursor-pointer p-10 hover:bg-slate-900 duration-300 rounded' onClick={clickHandler}>
            <div className='text-3xl text-center mb-2'>{props.article.title}</div>
            <div className='w-full h-[500px] relative mx-auto'>
                <Image src={props.article.image} alt={props.article.title} fill className='object-cover object-top' />
            </div>
            <div>{props.article.content.slice(0, 100)}...</div>
        </div>
    );
}
