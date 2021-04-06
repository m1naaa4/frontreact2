import {AddComment, GetComment} from "../../../services/Comment/CommentService";

export const AddCommentAction = (data, props, url) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_COMMENT'});

        AddComment(data, props, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_COMMENT_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_COMMENT_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}
export const GetCommentAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_GET_COMMENT'});

        GetComment(data).then((res) =>
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