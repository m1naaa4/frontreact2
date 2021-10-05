import { generalePost, GetMyProject } from "../../../services/User/Profile/ProfileService";


export const Delete = (data) =>{

    return (dispatch)=>{

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'DELETE_MY_PROJECT_LIST_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_MY_PROJECT_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}

export const getMyOffresAction = (data, props, current) =>{

    return (dispatch) =>
    {
        GetMyProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_MY_PROJECT_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_MY_PROJECT_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'GET_ERROR',error});
        }
        )
    }
    
}
