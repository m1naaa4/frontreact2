const initState = {
    authAdmin:""
}
     

    const authAdminReducer = (state=initState, action) => {

        switch(action.type){

            case 'RESTART_AUTH_RESPONSE':
                return {
                    ...state,
                    authAdmin:""
                }
            case 'LOADING':
                return {
                    ...state,
                    authAdmin:'loading...'
                }

            case 'SIGNUP_SUCCESS':
                return {
                  ...state,
                  authAdmin:action.res,
                }
    
            case 'SIGNUP_ERROR':

                return {
                    ...state,
                    authAdmin:action.res,
                }
    
            case 'CODE_ERROR':
                return {
                    ...state,
                    authAdmin:'there seems to be a problem please refresh your browser',
                }
            case 'LOGIN_ADMIN_SUCCESS':
                return {
                    ...state,
                    authAdmin : action.res.user
                }
            case 'LOAD_ADMIN_SUCCESS':
                return {
                    ...state,
                    admin : action.res.user
                }
            case 'LOGIN_ADMIN_ERROR':
                return {
                    ...state,
                    authAdmin:action.res,
                }
            case 'LOGOUT_ADMIN_SUCCESS':
                return {
                    ...state,
                    authAdmin:action.res,
                }
            case 'LOGOUT_ADMIN_ERROR':
                return {
                    ...state,
                    authAdmin:action.res,
                }
    
            default:
                return state
    
        }
    }
    
    export default authAdminReducer;
