import iaxios from "./iaxios";

export const getArticleList = () => {
    return iaxios.get('/articles/');
}

export const createArticle = (title: string, image:string, content: string) => {
    return iaxios.post('/articles/', {
        title: title,
        content: content,
        image: image,
    })
}

export const getArticleDetail = (id: number) => {
    return iaxios.get(`/articles/${id}/`);
}

export const updateArticle = (id: number, title: string, image: string, content: string) => {
    return iaxios.put(`/articles/${id}/`, {
        title: title,
        content: content,
        image: image,
    })
}

export const deleteArticle = (id: number) => {
    return iaxios.delete(`/articles/${id}/`);
}