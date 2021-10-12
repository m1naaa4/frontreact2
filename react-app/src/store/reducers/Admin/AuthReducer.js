const initState = {
    adminAuth:""
}
     

    const AdminAuthReducer = (state=initState, action) => {

        switch(action.type){

            case 'RESTART_AUTH_RESPONSE':
                return {
                    ...state,
                    adminAuth:""
                }
            case 'LOADING':
                return {
                    ...state,
                    adminAuth:'loading...'
                }

            case 'SIGNUP_SUCCESS':
                return {
                  ...state,
                  adminAuth:action.res,
                }
    
            case 'SIGNUP_ERROR':

                return {
                    ...state,
                    adminAuth:action.res,
                }
    
            case 'CODE_ERROR':
                    return {
                        ...state,
                        adminAuth:'there seems to be a problem please refresh your browser',
                    }
            case 'LOGIN_ADMIN_SUCCESS':
                return {
                    ...state,
                    adminAuth : action.res.user
                }
            case 'LOGIN_ADMIN_ERROR':
                return {
                    ...state,
                    adminAuth:action.res,
                }
            case 'LOGOUT_ADMIN_SUCCESS':
                return {
                    ...state,
                    adminAuth:action.res,
                }
            case 'LOGOUT_ADMIN_ERROR':
                return {
                    ...state,
                    adminAuth:action.res,
                }
    
            default:
                return state
    
        }
    }
    
    export default AdminAuthReducer;
