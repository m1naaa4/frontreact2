import {GetProject} from '../../../../services/User/Project/ProjectService'


export const getProjectAction = (data, props, current) =>{

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