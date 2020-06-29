import {LoadProject} from '../../../../services/User/Project/ProjectService'


export const loadProjectAction = (data, props, current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING'});

        LoadProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'LOAD_PROJECT_SUCCESS',res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'LOAD_PROJECT_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}