import axios from 'axios'
import {LoginUser,SignUpService,LogoutUser} from '../../../../services/User/AuthService'


export const signUpAction = (credentials,props) =>
{

    return (dispatch)=>{
        
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        dispatch({type:'LOADING'});
         dispatch({type:'LOADING_LOAD_USER'});

        SignUpService(credentials).then((res)=>{
            if(res.hasOwnProperty('success') && res.success===true &&  res.hasOwnProperty('token')){

                localStorage.setItem('user-token','Bearer '+res.token);

                axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token');

                dispatch({type:'LOGIN_SUCCESS', res});
                dispatch({type:'LOAD_USER_SUCCESS',res});
                setTimeout(() => {
                    props.history.push("/profile/"+res.user.profile_id);
                    dispatch({type:'RESTART_AUTH_RESPONSE'});
                }, 10);

            }else if(res.hasOwnProperty('success') && res.success===false) {
                dispatch({type:'SIGNUP_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}


export const UserLoginAction = (credentials,props) =>
{
    return (dispatch)=>{
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        dispatch({type:'LOADING'});
        dispatch({type:'LOADING_LOAD_USER'});
        LoginUser(credentials).then((res)=>{
            if(res.success===true && res.hasOwnProperty('token')){
                localStorage.setItem('user-token','Bearer '+res.token);

                axios.defaults.headers.common['Authorization'] = localStorage.getItem('user-token');

                dispatch({type:'LOGIN_SUCCESS', res});
                
                dispatch({type:'LOAD_USER_SUCCESS',res});
                setTimeout(() => {
                    props.history.push("/project/lists");
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


export const UserLogOutAction = (history) =>
{
    

 return (dispatch)=>{


    dispatch({type:'RESTART_AUTH_RESPONSE'});
     LogoutUser().then((res)=>{
        if(res.success===true){
            dispatch({type:'LOGOUT_SUCCESS',res});

             localStorage.removeItem('user-token');
            history.push("/login")

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


