import axios from 'axios'
import { LoginAdmin, LogoutAdmin } from '../../../services/Admin/AuthService';



export const AdminLoginAction = (credentials,props) =>
{
    return (dispatch)=>{
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        dispatch({type:'LOADING'});
        dispatch({type:'LOADING_LOAD_ADMIN'});
        LoginAdmin(credentials).then((res)=>{
            if(res.success===true && res.hasOwnProperty('token')){
                localStorage.setItem('admin-token','Bearer '+res.token);

                axios.defaults.headers.common['Authorization'] = localStorage.getItem('admin-token');

                dispatch({type:'LOGIN_ADMIN_SUCCESS', res});
                
                // dispatch({type:'LOAD_ADMIN_SUCCESS',res});
                setTimeout(() => {
                    props.history.push("/admin/dashboard");
                    dispatch({type:'RESTART_AUTH_RESPONSE'}); 
                }, 100);
                
            }else if(res.success===false){
                dispatch({type:'LOGIN_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        })
    }
}


export const AdminLogOutAction = (history) =>
{
    

 return (dispatch)=>{


    dispatch({type:'RESTART_AUTH_RESPONSE'});
     LogoutAdmin().then((res)=>{
        if(res.success===true){
            dispatch({type:'LOGOUT_SUCCESS',res});

             localStorage.removeItem('admin-token');
            history.push("/admin/login")

        }else if(res.success===false){
            dispatch({type:'LOGOUT_ERROR',res})

        }
    },
    error=>{
        dispatch({type:'CODE_ERROR',error});
    }
    
     )
 }   
}


export const clearUserAuthState = () =>
{
    return (dispatch) =>
    {
        dispatch({type:'RESTART_AUTH_RESPONSE'});
    }
  
}


