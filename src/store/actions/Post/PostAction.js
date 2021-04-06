import { AddPost, DeletePost, GetPosts } from "../../../services/User/Profile/ProfileService";


export const GetPostsAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_GET_POSTS'});

        GetPosts(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'GET_POSTS_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'GET_POSTS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const AddPostAction = (data, props) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_POST'});

        AddPost(data, props).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_POST_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_POST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const DeletePostAction = (data, props) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_POST'});

        DeletePost(data, props).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'DELETE_POST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

