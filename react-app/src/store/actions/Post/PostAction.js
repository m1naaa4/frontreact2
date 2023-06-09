import { DeletePost, GetYoutube } from "../../../services/User/Profile/ProfileService";
import { DeleteService, GetsService, PostService } from "../../../services/Post/PostService";

export const GetPostsAction = (data, props, current, url) => {

    return (dispatch) => {

        dispatch({ type: 'LOADING_GET_POSTS' });

        GetsService(data, props, current, url).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'GET_POSTS_SUCCESS', res });
            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'GET_POSTS_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }

}

export const AddPostAction = (data, url) => {

    return (dispatch) => {

        dispatch({ type: 'LOADING_ADD_POST' });

        PostService(data, url).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                // dispatch({ type: 'ADD_POST_SUCCESS', res });

            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'ADD_POST_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }

}

export const DeletePostAction = (data, url) => {

    return (dispatch) => {

        dispatch({ type: 'LOADING_ADD_POST' });

        DeleteService(data, url).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {

            } else if (res.hasOwnProperty('success') && res.success === false) {
                dispatch({ type: 'DELETE_POST_ERROR', res })
            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }

}

export const GetYoutubeAction = (data, props) => {

    return (dispatch) => {
        GetYoutube(data, props).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                dispatch({ type: 'GET_YOUTUBE_SUCCESS', res });
            } else if (res.hasOwnProperty('success') && res.success === false) {

            }
        },
            error => {
                dispatch({ type: 'CODE_ERROR', error });
            }
        )
    }

}

