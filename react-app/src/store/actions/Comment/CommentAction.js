import { PostService, GetService, UpdateService, DeleteService } from "../../../services/Comment/CommentServices";

export const AddCommentAction = (data, url) =>{
    return (dispatch)=>{
        // dispatch({type:'LOADING_ADD_COMMENT'});
        PostService(data, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS', res});
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_COMMENT_POST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}

export const AddCommentProjectAction = (data, props, url) =>{
    return (dispatch)=>{
        // dispatch({type:'LOADING_ADD_COMMENT'});
        PostService(data, props, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_TO_COLLECTION_COMMENT_SUCCESS', res});
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_COMMENT_POST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}

export const GetCommentAction = (data, url) =>{
    return (dispatch)=>{
        dispatch({type:'LOADING_GET_COMMENT'});
        GetService(data, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'GET_COMMENT_SUCCESS',res});
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'GET_COMMENT_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}

export const DeleteCommentAction = (data, url, item_ids) =>{
    return (dispatch)=>{
        DeleteService(data, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'DELETE_COMMENT_POST', res, item_ids});
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'DELETE_COMMENT_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}

export const EditCommentAction = (data, props, url) =>{
    return (dispatch)=>{
        // dispatch({type:'LOADING_ADD_COMMENT'});
        UpdateService(data, props, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS', res});
                    // dispatch({type:'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS', res : res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_COMMENT_POST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}