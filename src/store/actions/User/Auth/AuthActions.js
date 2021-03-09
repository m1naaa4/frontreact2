import {LoginUser,SignUpService,LogoutUser} from '../../../../services/User/AuthService'


export const signUpAction = (credentials,props) =>
{

    return (dispatch)=>{
        
        dispatch({type:'RESTART_AUTH_RESPONSE'});
        dispatch({type:'LOADING'});

        SignUpService(credentials).then((res)=>{

            if(res.hasOwnProperty('success') && res.success===true &&  res.hasOwnProperty('token')){

                localStorage.setItem('user-token','Bearer '+res.token);

                dispatch({type:'LOGIN_SUCCESS'});
                setTimeout(() => {
                    props.history.push("/projects/lists");
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
     LoginUser(credentials).then((res)=>{
        if(res.success===true && res.hasOwnProperty('token')){
            console.log('ready to login user with '+res.token)
            localStorage.setItem('user-token','Bearer '+res.token);
            dispatch({type:'LOGIN_SUCCESS'});
            setTimeout(() => {
                props.history.push("/project/lists");
                dispatch({type:'RESTART_AUTH_RESPONSE'}); 
            }, 10);
            
        }else if(res.success===false){
            dispatch({type:'LOGIN_ERROR',res})
        }
           
    },
    error=>{
        dispatch({type:'CODE_ERROR',error});
    }
    
     )
 }   
}


export const UserLogOutAction = () =>
{
    

 return (dispatch)=>{


    dispatch({type:'RESTART_AUTH_RESPONSE'});
     LogoutUser().then((res)=>{
        if(res.success===true){
            dispatch({type:'LOGOUT_SUCCESS',res});

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


