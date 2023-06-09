const initState = {
    authResponse:""
}
     

    const UserAuthReducer = (state=initState, action) =>{
        switch(action.type){
            case 'RESTART_AUTH_RESPONSE':
                return {
                    ...state,
                    authResponse:""
                }
            case 'LOADING':
                return {
                    ...state,
                    authResponse:'loading...'
                }
          
            case 'RESET_SUCCESS':
                return {
                    ...state,
                    authResponse: "true",
                }

            case 'RESET_ERROR':
                return {
                    ...state,
                    authResponse: "false",
                }

            case 'SIGNUP_SUCCESS':
                return {
                    ...state,
                    authResponse:action.res,
                }
    
            case 'SIGNUP_ERROR':

                return {
                    ...state,
                    authResponse:action.res,
                }
    
            case 'CODE_ERROR':
                return {
                    ...state,
                    authResponse:'there seems to be a problem please refresh your browser',
                }
            case 'LOGIN_SUCCESS':
                console.log('login success profile loaded',action.res);
                // window.globalLoggedProfile = action.res.profile;
                return {
                    ...state,
                    authResponse:'redirecting you to dashboard..'
                }
            case 'LOGIN_ERROR':
                return {
                    ...state,
                    authResponse:action.res,
                }
            case 'LOGOUT_SUCCESS':
                return {
                    ...state,
                    authResponse:action.res,
                }
            case 'LOGOUT_ERROR':
                return {
                    ...state,
                    authResponse:action.res,
                }

            default:
                return state
    
        }
    }
    
    export default UserAuthReducer;
