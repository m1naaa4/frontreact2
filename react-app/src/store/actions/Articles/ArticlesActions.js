import HttpService from "../../../services/HttpService";


export const getArticles = () => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_ARTICLES' });

        const http = new HttpService();
        const tempFilter = {
            by: "",
            search: "",
            categories: [],
            popular: {}
        }
        http.postData(tempFilter,"article/all").then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                console.log("get  res", res)
                dispatch({ type: 'LOAD_ARTICLES_SUCCESS', res });
            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'LOAD_ARTICLES_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }
}

export const getCategoryArticles = (id) => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_ARTICLES' });

        const http = new HttpService();
        
        http.getRequest({}, "article/byCategory/"+id).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                console.log("get  res", res)
                dispatch({ type: 'LOAD_CATEGORIES_ARTICLES_SUCCESS', res });

            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'LOAD_ARTICLES_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }
}

export const getArticle = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_LOAD_ARTICLE' });

        const http = new HttpService();
        http.getData(`article/get/${id}`).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {

                dispatch({ type: 'LOAD_ARTICLE_SUCCESS', res });

            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'LOAD_ARTICLES_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }
}

export const getCategories = () => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_CATEGORIES' });

        const http = new HttpService();

        http.getRequest({}, "article/categories").then((res) => {
            console.log("categories res", res)
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'LOAD_CATEGORIES_SUCCESS', res });

            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'LOAD_CATEGORIES_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }
}

