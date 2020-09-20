import * as actionTypes from '../actions/actionTypes';

const initialState = {
    Articles : [], selectedArticle:null,
    Comments : [], selectedComment:null,
    Users : [], selectedUser: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.POST_ARTICLE:
            const newArticle = {
                id: action.id,
                author_id : action.author_id,
                title : action.title, 
                content : action.content,
            }
            return {...state, Articles: state.Articles.concat(newArticle)};

        case actionTypes.GET_ALL_ARTICLE:
            return {...state, Articles : action.Articles};

        case actionTypes.GET_ALL_COMMENT:
            return {...state, Comments : action.Comments};

        case actionTypes.GET_ARTICLE:
            return {...state, selectedArticle : action.target};

        case actionTypes.GET_COMMENT:
            return { ...state, selectedComment: action.target};

        case actionTypes.GET_ALL_USER:
            return {...state, Users : action.Users };

        case actionTypes.GET_USER:
            return {...state, selectedUser : action.target };

        case actionTypes.POST_COMMENT:
            const newComment = {
                id : action.id,
                author_id : action.author_id,
                article_id : action.article_id,
                content : action.content,
            }
            return {...state, Comments : state.Comments.concat(newComment)};

        case actionTypes.PUT_USER:
            const userstatus = state.Users.map((User) =>
            {
                if(User.id === action.targetID){
                    User.logged_in = action.logged_in
                    return User
                }
                else{
                    return User
                }
            });
            return {...state, Users : userstatus, selectedUser : action.target};

        case actionTypes.PUT_ARTICLE:
            const editArticles = state.Articles.map((Article) =>
            {
                if(Article.id === action.targetID){
                    Article.title = action.title
                    Article.content = action.content
                    return Article
                }
                else{
                    return Article
                }
            });
            return {...state, Articles : editArticles};
            
        case actionTypes.PUT_COMMENT:
            const editComments = state.Comments.map((Comment) => {
                if(Comment.id === action.targetID){
                    Comment.content = action.content
                    return Comment
                }
                else{
                    return Comment
                }
            });
            return {...state,Comments : editComments};
            
        case actionTypes.DELETE_ARTICLE:
            const deletedArticles = state.Articles.filter((Article) =>
            {
                return Article.id !== action.targetID;
            });
            return {...state, Articles : deletedArticles};

        case actionTypes.DELETE_COMMENT:
            const deletedComments = state.Comments.filter((Comment) =>
            {
                return Comment.id !== action.targetID;
            });
            return {...state, Comments : deletedComments};

        default:
            break;
    }
    return state;
}

export default reducer;

