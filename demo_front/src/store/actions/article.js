import * as actionTypes from './actionTypes';
import axios from 'axios';
import {push} from 'connected-react-router';

export const getArticles_ = (Articles) => {
    return{
        type: actionTypes.GET_ALL_ARTICLE,
        Articles: Articles
    };
};

export const getArticles = () => {
    return dispatch => {
        return axios.get('/api/articles')
                    .then(res => dispatch(getArticles_(res.data)));
    };
};

export const getComments_ = (Comments) => {
    return {
        type: actionTypes.GET_ALL_COMMENT,
        Comments : Comments
    };
};

export const getComments = () => {
    return dispatch => {
        return axios.get('/api/comments')
                    .then(res => dispatch(getComments_(res.data)));
    };
};

export const getUsers_ = (Users) => {
    return {
        type: actionTypes.GET_ALL_USER,
        Users : Users
    };
};

export const getUsers = () => {
    return dispatch => {
        return axios.get('/api/user')
                    .then(res => dispatch(getUsers_(res.data)));
    };
};

export const postArticle_ = (article) => {
    return {
        type: actionTypes.POST_ARTICLE,
        id : article.id,
        title : article.title,
        content : article.content,
        author_id : article.author_id
    };
};

export const postArticle = (article) => {
    return (dispatch) =>{
        return axios.post('/api/articles', article)
                    .then(res => {
                        dispatch(postArticle_(res.data));
                        dispatch(push('../articles/' + res.data.id));
                    });
    };
};


export const postComment_ = (comment) => {
    return {
        type: actionTypes.POST_COMMENT,
        id : comment.id,
        author_id : comment.author_id,
        article_id : comment.article_id,
        content : comment.content,
    };
};

export const postComment = (comment) => {
    return (dispatch) => {
        return axios.post('/api/comments', comment)
                    .then(res => {
                        dispatch(postComment_(res.data))
                    });
    };
};

export const putArticle_ = (article) => {
    return {
        type : actionTypes.PUT_ARTICLE,
        id : article.id,
        title : article.title,
        content : article.content,
        author_id : article.author_id,
        targetID : article.id
    };
};

export const putArticle = (article) => {
    return (dispatch) => {
        return axios.patch(`/api/articles/${article.id}`, {title : article.title, content : article.content})
                    .then(res => {
                        dispatch(putArticle_(res.data));
                        dispatch(push('../' + res.data.id));
                    });
    };
};

export const putComment_ = (comment) => {
    return {
        type : actionTypes.PUT_COMMENT,
        id : comment.id,
        author_id : comment.author_id,
        article_id : comment.article_id,
        content : comment.content,
    };
};

export const putComment = (comment) => {
    return (dispatch) => {
        return axios.patch(`/api/comments/${comment.id}`,{content : comment.content})
                    .then(res => {
                        dispatch(putComment_(res.data));
                    });
    };
};

export const putUser_ = (user) => {
    return {
        type : actionTypes.PUT_USER,
        id : user.id,
        email : user.email,
        password : user.password,
        name : user.name,
        logged_in : user.logged_in,
        targetID : user.id
    };
};

export const putUser = (user) => {
    return (dispatch) => {
        return axios.patch('/api/user/1', {logged_in: user.logged_in})
                    .then(res => {
                        dispatch(putUser_(res.data));
                    })
    };
};

export const deleteArticle_ = (id) => {
    return {
        type : actionTypes.DELETE_ARTICLE,
        targetID : id
    };
};

export const deleteArticle = (id) => {
    return (dispatch) => {
        return axios.delete('/api/articles/' + id)
                    .then(res => {
                        dispatch(deleteArticle_(id));
                        dispatch(push('../articles'));
                    });
    };
};

export const deleteComment_ = (id) => {
    return {
        type: actionTypes.DELETE_COMMENT,
        targetID : id
    };
};

export const deleteComment = (id) => {
    return (dispatch) => {
        return axios.delete('/api/comments/' + id)
                    .then(res => {
                        dispatch(deleteComment_(id));
                    })
    };
};


export const getArticle_ = (Article) => {
    return {
        type : actionTypes.GET_ARTICLE,
        target : Article
    };
};

export const getArticle = (id) => {
    return (dispatch) => {
        return axios.get('/api/articles/' + id)
                    .then(res => {
                        dispatch(getArticle_(res.data));
                    })
    };
};

export const getComment_ = (Comment) => {
    return {
        type : actionTypes.GET_COMMENT,
        target : Comment,
    };
};

export const getComment = (id) => {
    return (dispatch) => {
        return axios.get('/api/comments/' + id)
                    .then(res => {
                        dispatch(getComment_(res.data));
                    })
    };
};

export const getUser1_ = (User) => {
    return {
        type : actionTypes.GET_USER,
        target : User
    };
};

export const getUser1 = () => {
    return (dispatch) => {
        return axios.get('/api/user/1')
                    .then(res => {
                        dispatch(getUser1_(res.data));
                    })
    };
};


