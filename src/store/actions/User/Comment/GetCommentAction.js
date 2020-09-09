import {GetComment} from "../../../../services/User/Comment/CommentService";


export const GetCommentAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING'});

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