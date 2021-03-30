import { GetPosts } from "../../../services/User/Profile/ProfileService";

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