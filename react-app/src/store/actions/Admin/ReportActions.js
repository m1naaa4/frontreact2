import { generaleGet } from "../../../services/Admin/AdminService";
import { generalePost } from "../../../services/User/Profile/ProfileService";


export const ReportsAction = (data) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_LOAD_REPORT'});

        generaleGet(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success===true){
                 
                dispatch({type:'LOAD_REPORT_SUCCESS',res});
                
            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'LOAD_REPORT_ERROR',res})
            }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
        )
    } 
}

export const SendReportAction = (data) =>{
    return (dispatch)=>{
        
        generalePost(data).then((res)=>{
            
            if(res.hasOwnProperty('success') && res.success === true){
                 
                dispatch({type:'ADD_REPORT_SUCCESS', res});
                
            }else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'ADD_REPORT_ERROR',res})
            }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
        )
    } 
}

