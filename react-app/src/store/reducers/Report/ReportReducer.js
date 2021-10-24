const initState = {
    reports : []
}
     

    const ReportReducer = (state=initState, action) => {

        switch(action.type){

            case 'LOADING':
                return {
                    ...state,
                    reports : 'loading...'
                }
                
            case 'LOAD_REPORT_SUCCESS':
                return {
                    ...state,
                    reports : action.res.reports
                }

            case 'ADD_REPORT_SUCCESS':
                return {
                    ...state,
                    report : true
                }

            case 'LOGIN_ADMIN_ERROR':
                return {
                    ...state,
                    reports : action.res,
                }
    
            default:
                return state
    
        }
    }
    
    export default ReportReducer;
