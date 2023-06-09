import {GetService, PostService, UploadLogoService, UploadMediaService} from "../../../services/Media/MediaService";
import { UpdateService } from "../../../services/Project/ProjectServices";
import { UpdateServiceUser } from "../../../services/User/UserService";

export const UploadLogoAction = (providerId, file, provider, type, url) =>
{
    return (dispatch)=>
    {
        UploadLogoService(providerId, file, provider, type, url).then((res) =>
        {
            if(res.hasOwnProperty('success') && res.success === true){
                if (provider === 'project') {
                    let data = {
                        'logo_link' : res.urls[0],
                        'project_id' : providerId,
                    }
    
                    UpdateService(data, '/update-media');
                }
                if (provider === 'user') {
                    let data = {
                        'type' : type,
                        'media_link' : res.urls[0],
                        'profile_id' : providerId,
                    }
                    UpdateServiceUser(data, '/profile/update-media').then((res) =>
                    {
                        dispatch({type:'LOAD_USER_SUCCESS', res});
                    });
                }

            }else if(res.hasOwnProperty('success') && res.success === false) {
                // dispatch({type:'ADD_PROJECT_ERROR',res})
            }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
    )}
}

export const UploadMediaAction = (data, url) =>{
    return (dispatch) =>
    {
        console.log('data', data.get("media_section"));
        UploadMediaService(data, url).then((res) => {
            if(res.hasOwnProperty('success') && res.success === true)
            {
                if (data.get("media_section") === 'post') {
                    console.log(res.urls);
                    dispatch({type:'GET_MEDIA_POSTS_SUCCESS', res});
                }
            }
            else if(res.hasOwnProperty('success') && res.success === false) 
            {

            }
        },
        error => {
            dispatch({type:'GET_ERROR',error});
        }
        )
    }
}

export const UploadAvatarAction = (data, url) =>{
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

export const UploadCoverAction = (data, url) =>{
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

export const GetMediaAction = (data, url) => {
    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_MEDIA'});

        PostService(data, url).then((res)=>{
            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_MEDIA_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_MEDIA_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'GET_ERROR',error});
        }
        )
    }
}


