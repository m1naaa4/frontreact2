import HttpArticle from "../../../services/Article/Service";


export const getArticles = (data) => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_ARTICLES' });

        const http = new HttpArticle();

        http.postData(data, "/").then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
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

export const getPopulareArticles = () => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_ARTICLES' });

        const http = new HttpArticle();
        
        http.GetData("/get/populare").then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'LOAD_POPULARE_ARTICLES_SUCCESS', res });
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

export const getSuggrestionArticles = () => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_ARTICLES' });

        const http = new HttpArticle();
        
        http.GetData("/get/suggestion").then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'LOAD_SUGGESTION_ARTICLES_SUCCESS', res });
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

        const http = new HttpArticle();
        
        http.GetData({}, "article/byCategory/"+id).then((res) => {
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

        const http = new HttpArticle();
        http.GetData(`/article/${id}`).then((res) => {
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

export const getAuthorArticles = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_LOAD_AUTHOR_ARTICLES' });

        const http = new HttpArticle();
        http.getData(`article/author/${id}`).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'LOAD_AUTHOR_ARTICLES_SUCCESS', res });

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

        const http = new HttpArticle();

        http.GetData( "/get/categories").then((res) => {
            
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

