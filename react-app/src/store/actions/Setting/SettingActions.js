import { generaleGet, generalePost } from "../../../services/User/Profile/ProfileService";

export const TeamsAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_LOAD_TEAMS'});

        generalePost(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_TEAMS_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_TEAMS_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const PermissionsAction = (data) =>{
    return (dispatch)=>{


        generaleGet(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_PERMISSIONS_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_TEAMS_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const CreateTeamsAction = (data) =>{
    return (dispatch)=>{

        generalePost(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'ADD_TEAMS_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'ADD_TEAMS_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const TeamMembersAction = (data) =>{
    return (dispatch)=>{

        generaleGet(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LIST_TEAM_MEMBERS_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'ADD_TEAMS_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const EditTeamAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_LOAD_PROFILE'});

        generalePost(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'EDIT_TEAMS_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'EDIT_TEAMS_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}

export const DeleteTeamAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_UPDATE_PROFILE'});

        generalePost(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'DELETE_TEAMS_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'DELETE_TEAMS_ERROR,res'})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
}

