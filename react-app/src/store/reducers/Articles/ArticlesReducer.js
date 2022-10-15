const initState = {
    articles: [],
    categories: []
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

        default:
            return state

            }
    }

    export default ArticlesReducer;
