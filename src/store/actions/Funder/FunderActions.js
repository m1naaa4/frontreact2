import {GetMyProject, GetProject, FunderServices} from "../../../services/Funder/FunderServices";


export const CreateFunderAction = (data, props, url, navigation) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_CREATE_FUNDER'});

        FunderServices(data, props, url, navigation).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'CREATE_FUNDER_SUCCESS',res});
                    const { next } = navigation;
                        next()
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'CREATE_FUNDER_ERROR',res})
                }

            },
            error => {
                dispatch({type:'CREATE_FUNDER_CODE_ERROR',error});
            }
        )
    }

}

export const ClearProjectsAction = () =>{

    return (dispatch)=>{

        dispatch({type:'CLEAR_STATE_PROJECT_SUCCESS'});
    }

}


export const GetProjectAction = (data, props, current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_PROJECT'});

        GetProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_PROJECT_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_PROJECT_ERROR',res})
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

