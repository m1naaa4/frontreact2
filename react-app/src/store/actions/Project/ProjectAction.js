import {GetService, PostService, UpdateService, DeleteService, GetProject, GetMyProject, LoadProject} from "../../../services/Project/ProjectServices";
import { UploadLogoAction } from "../Media/MediaAction";

export const AddProjectsAction = (data, props, url, navigation, file, history, step) =>
{
    return (dispatch)=>
    {
        dispatch({type:'LOADING_ADD_PROJECT'});

        PostService(data, url, navigation, file, history, step).then((res) =>
        {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_PROJECT_SUCCESS', res});
                        if (file && file != '') {
                            dispatch(UploadLogoAction(res.projectid, file, 'project', 'image', '/upload'));
                        }
                    
                    if (navigation) {
                        if (step != 'step3') {
                            const { next } = navigation;
                            next();
                            history.push('/project/create/' + res.projectid + '/' + step);
                        }
                    }  
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_PROJECT_ERROR',res})
                }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
    )}
}

export const UpdateProjectsAction = (data, url) =>
{
    return (dispatch)=>
    {
        dispatch({type:'LOADING_ADD_PROJECT'});

        UpdateService( data, url ).then((res) =>
        {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_PROJECT_SUCCESS',res});
                      
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_PROJECT_ERROR',res})
                }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
    )}
}

export const getProjectAction = (data, url) =>{
    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_PROJECT'});

        GetService(data, url).then((res)=>{
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

export const loadProjectAction = (data, current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_ALL_PROJECTS'});
        LoadProject(data, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'LOAD_PROJECT_SUCCESS', res});
                if (res.filters == true) {
                    dispatch({type:'LOAD_PROJECT_FILTERS_SUCCESS', res});
                }
                
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

export const loadProjectOnceAction = (data, props, current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_ALL_PROJECTS'});
        LoadProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'LOAD_PROJECT_ONCE_SUCCESS', res});
                if (res.filters == true) {
                    dispatch({type:'LOAD_PROJECT_FILTERS_SUCCESS', res});
                }
                
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

export const ClearProjectsAction = () =>{
    return (dispatch)=>{
        dispatch({type:'CLEAR_STATE_PROJECT_SUCCESS'});
    }
}

export const displayProjectAction = (data, props, history, id) =>{
    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_PROJECT'});

        GetProject(data, history, id).then((res)=>{
            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_PROJECT_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                if (res.code === 403) {
                    history.push("/noauthorization/"+id)
                }
                else if (res.code === 404) {
                    history.push("/notfound/"+id)
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

export const getMyOffresAction = (data, url) =>{
    return (dispatch) =>
    {
        PostService(data, url).then((res) => {

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_MY_CONTENTS_SUCCESS', res});
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

