import {LoadUser, LoadProfile, UpdateProfile, Cvsave, Cvget, CvUpdate, Cvdelete, updateAccess, updateInfo, language, confirme} from '../../../services/User/Profile/ProfileService'


export const loadUserAction = () =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_LOAD_USER'});

        LoadUser().then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_USER_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_USER_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const ProfileAction = (id) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_LOAD_PROFILE'});

        LoadProfile(id).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_PROFILE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const EditProfileAction = (id) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_UPDATE_PROFILE'});

        UpdateProfile(id).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'UPDATE_PROFILE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const CvAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_CVTHEQUE'});

        Cvsave(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_CVTHEQUE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_CVTHEQUE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }   
}

export const CvUpdateAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_CVTHEQUE'});

        CvUpdate(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_CVTHEQUE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_CVTHEQUE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }   
}

export const CvdeleteAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_CVTHEQUE'});

        Cvdelete(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_CVTHEQUE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_CVTHEQUE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }   
}

export const getCvthequeAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_CVTHEQUE'});

        Cvget(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_CVTHEQUE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_CVTHEQUE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }   
}

export const AccessUserAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_UPDATE_PROFILE'});

        updateAccess(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'UPDATE_PROFILE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const UserInfoAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_UPDATE_PROFILE'});

        updateInfo(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'UPDATE_PROFILE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const LanguageAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_UPDATE_PROFILE'});

        language(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'UPDATE_PROFILE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const ConfirmationAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_UPDATE_PROFILE'});

        confirme(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                //dispatch({type:'LOAD_PROFILE_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                //dispatch({type:'UPDATE_PROFILE_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

