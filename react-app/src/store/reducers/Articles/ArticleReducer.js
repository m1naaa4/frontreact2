const initState = {
    article: {}
}


const ArticlesReducer = (state = initState, action) => {

    switch (action.type) {

        case 'LOADING_LOAD_ARTICLE':
            return {
                ...state,
                article: {},
                loading: true
            }

        case 'LOAD_ARTICLE_SUCCESS':
            return {
                ...state,
                article: action.res.article,
                loading: false
            }

        case 'EDIT_ARTICLE_SUCCESS':
            return {
                ...state,
                article: action.res.article,
            }

        default:
            return state

    }
}

export default ArticlesReducer;
