const initState = {
    mentor : ""
}


const CreateMentorReducer = (state= initState | undefined, action) =>{
    switch(action.type){

        case 'LOADING_CREATE_FUNDER':
            return {
                ...state,
                mentor:'loading'
            }

        case 'CREATE_MENTOR_SUCCESS':
            return {
                ...state,
                mentor: action.res,
                mentorId: action.res.project.id,
                success: action.res.success,
            }
        case 'CLEAR_STATE_MENTOR_SUCCESS':
            return {
                ...state,
                mentor:null,
                getproject:null,
                funderId:null,
            }

        case 'CREATE_MENTOR_ERROR':
            return {
                ...state,
                mentor:action.res,
            }

        case 'CREATE_MENTOR_CODE_ERROR':
            return {
                ...state,
                mentor:'there seems to be a problem please refresh your browser',
            }
            
        default:
            if (action.res === undefined) {

                return {
                    ...state,
                    mentor:state
                }
            }
            return state

    }
}
    
export default CreateMentorReducer;
