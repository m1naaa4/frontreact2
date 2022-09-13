import HttpService from "../../../services/HttpService";


export const getArticles = () => {
    return (dispatch) => {

        dispatch({ type: 'LOADING_LOAD_ARTICLES' });

        const http = new HttpService();
        http.getData("getArticles").then((res) => {
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

export const getArticle = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_LOAD_ARTICLE' });

        const http = new HttpService();
        http.getData(`getArticle/${id}`).then((res) => {
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
