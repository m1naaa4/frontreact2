import {AddComment} from "../../../../services/User/Comment/CommentService";


export const AddCommentAction = (data, props, url) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_COMMENT'});

        AddComment(data, props, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_COMMENT_SUCCESS',res});

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