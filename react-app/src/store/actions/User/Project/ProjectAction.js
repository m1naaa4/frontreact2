import {GetMyProject, GetProject, ProjectServices} from "../../../../services/User/Project/ProjectServices";
import axios from "axios";

export const AddProjectsAction = (data, props, url, navigation, file, history, step) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_PROJECT'});

        ProjectServices(data, props, url, navigation, file, history, step).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_PROJECT_SUCCESS',res});
                        if (file && file != '') {
                            const formData = new FormData();
                            formData.append('attachments[]', file);
                            formData.append("media_section", "project");
                            formData.append("media_type", "image");
                            formData.append("type", "logo");
                            formData.append("provider", "project");
                            formData.append("visibility", 'public');
                            formData.append("provider_id", res.projectid);
                        
                            let url_media = `${process.env.REACT_APP_MEDIA_UPLOAD}`;
                            axios.defaults.withCredentials = false;
                        
                            axios.post(url_media, formData)
                            .then((response) => {
                                data.logolink = response.data.urls[0]; 
                                data.project_id = res.projectid;
                                ProjectServices(data, props, url)
                            });
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
        )
    }

}

export const ClearProjectsAction = () =>{

    return (dispatch)=>{

        dispatch({type:'CLEAR_STATE_PROJECT_SUCCESS'});
    }

}


export const GetProjectAction = (data, props, history, id) =>{

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

export const getMyOffresAction = (data, props, url) =>{

    return (dispatch) =>
    {
        GetMyProject(data,props, url).then((res)=>{

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

