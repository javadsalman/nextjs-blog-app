export interface IAuthorInfo {
    "id": number,
    "username": string,
    "email": string,
    "first_name": string,
    "last_name": string,
    "token": string,
}

export interface IArticle {
    "id": number,
    "author": string,
    "title": string,
    "content": string,
    "created": string,
    "image": string,
    "author_id": number,
}

export type ArticleListType = IArticle[];