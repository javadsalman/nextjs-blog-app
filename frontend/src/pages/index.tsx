// import styles from '@/styles/Home.module.css'

import { getArticleList } from "@/api/blogApi";
import BlogList from "@/containers/BlogList/BlogList";
import Head from "next/head";
import { ArticleListType } from "types";

export interface IHomePageProps {
  articleList: ArticleListType;
}


export default function Home(props: IHomePageProps) {
  return (
    <>
      <Head>
        <meta name="keywords" content="web development, programming" />
        <title>Home</title>
      </Head>
      <main>
        <h1 className="text-center text-white mt-10 text-5xl font-bold">Blog</h1>
        <BlogList articleList={props.articleList} />
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const response = await getArticleList();
  const articleList = response.data;
  return {
    props: {
      articleList,
    },
    revalidate: 3600,
  }
}

// export const getServerSideProps = async () => {
//   const response = await getArticleList();
//   const articleList = response.data;
//   return {
//     props: {
//       articleList,
//     },
//   }
// }