import { generaleGet, generalePost } from "../../../services/User/Profile/ProfileService";


export const DeleteAction = (data) => {

    return (dispatch) => {

        generalePost(data).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                // dispatch({type:'DELETE_MY_CONTENT_SUCCESS', data});

            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'LOADING_MY_CONTENT_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }
}

export const getMyContentsAction = (data, props, current) => {

    return (dispatch) => {

        dispatch({type:'LOADING_GET_MY_PROJECT'});

        generalePost(data).then((res) => {

            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'GET_MY_CONTENTS_SUCCESS', res });
            }
            else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'GET_MY_CONTENTS_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'GET_ERROR', error });
            }
        )
    }

}
