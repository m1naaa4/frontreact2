import { AddPost } from "../../../services/User/Profile/ProfileService";

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