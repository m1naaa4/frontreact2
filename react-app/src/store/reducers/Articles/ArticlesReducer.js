const initState = {
    articles: []
}


const ArticlesReducer = (state = initState, action) => {

    switch (action.type) {

        case 'LOADING_LOAD_ARTICLES':
            return {
                ...state,
                articles: [],
                loading: true
            }

        case 'LOAD_ARTICLES_SUCCESS':
            return {
                ...state,
                articles: action.res.result.articles,
                loading: false
            }

        default:
            return state

    }
}

export default ArticlesReducer;
