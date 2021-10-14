import { generaleGet, generalePost } from "../../../services/Admin/AdminService";


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
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    } 
}
