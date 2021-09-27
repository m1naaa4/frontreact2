import {GetMyProject, GetProject, ProjectServices} from "../../../../services/User/Project/ProjectServices";


export const AddProjectsAction = (data, props, url, navigation) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_PROJECT'});

        ProjectServices(data, props, url, navigation).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_PROJECT_SUCCESS',res});
                    const { next } = navigation;
                        next()
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_PROJECT_ERROR',res})
                }

            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const ClearProjectsAction = () =>{

    return (dispatch)=>{

        dispatch({type:'CLEAR_STATE_PROJECT_SUCCESS'});
    }

}


export const GetProjectAction = (data, props, history) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_PROJECT'});

        GetProject(data).then((res)=>{
            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_PROJECT_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                if (res.code === 403) {
                    history.push("/noauthorization")
                } else {
                    dispatch({type:'GET_PROJECT_ERROR',res})
                }
            }
        },
        error=>{
            dispatch({type:'GET_ERROR',error});
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

