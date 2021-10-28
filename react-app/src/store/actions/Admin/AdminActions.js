import { generaleGet, generalePost, LoadAdmin } from "../../../services/Admin/AdminService";


export const AdminAction = (data, history) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_LOAD_ADMIN'});

        LoadAdmin(data, history).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_ADMIN_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_ADMIN_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    } 
}

export const BlockContentAction = (data) =>{
    return (dispatch)=>{
        
        generalePost(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success === true){
                 
                dispatch({type:'CONTENT_BLOCKED_SUCCESS', res});
                
            }else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'CONTENT_BLOCKED_ERROR',res})
            }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
        )
    } 
}
