const initState = {
    articles: [],
    categories: [],
    populareArticles: [],
    suggrestionArticles: []
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
                articles: action.res.articles,
                hasMore:  action.res.hasMore,
                current:  action.res.current,
                loading: false
            }

        case 'LOAD_POPULARE_ARTICLES_SUCCESS':
            return {
                ...state,
                populareArticles: action.res.popularArticles,
                loading: false
            }

        case 'LOAD_SUGGESTION_ARTICLES_SUCCESS':
            return {
                ...state,
                suggrestionArticles: action.res.suggrestionArticles,
                loading: false
            }

        case 'LOADING_LOAD_CATEGORIES':
            return {
                ...state,
                categories: [],
                loading: true
            }

        case 'LOAD_CATEGORIES_SUCCESS':
            return {
                ...state,
                categories: action.res.categories,
                loading: false
            }

        case 'LOAD_CATEGORIES_ARTICLES_SUCCESS':
            return {
                ...state,
                articles: action.res.category.articles,
                loading: false
            }

        case 'LOADING_LOAD_AUTHOR_ARTICLES':
            return {
                ...state,
                author: {},
                loadingAuthor: true
            }

        case 'LOAD_AUTHOR_ARTICLES_SUCCESS':
            return {
                ...state,
                author: action.res.author,
                loadingAuthor: false
            }

        default:
            return state

    }
}

export default ArticlesReducer;
