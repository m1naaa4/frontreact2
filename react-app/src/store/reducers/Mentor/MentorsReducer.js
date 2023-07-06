const initState = {
    mentors: [],
    mentor: '',
    loading: true
}


const MentorsReducer = (state = initState || undefined, action) => {

    switch (action.type) {
        case 'LOADING_ALL_MENTORS':
            return {
                ...state,
                loading: true,
            }
        
        case 'CREATE_MENTOR_SUCCESS':
            return {
                ...state,
                mentor: action.res.mentor,
                mentorId: action.res.projectid,
                loading: false,
            }

         case 'GET_MENTOR_SUCCESS':
            return {
                ...state,
                mentor: action.res.mentor,
                mentorId: action.res.projectid,
                loading: false,
            }

        case 'LOADING_GET_MENTOR':
            return {
                ...state,
                loading: true,
        }

        case 'LOAD_MENTORS_ONCE_SUCCESS':
            state.mentors = [];
            return {
                ...state,
                mentors: action.res.mentors,
                hasMore: action.res.hasMore,
                current: action.res.current,
                loading: false
            }

        case 'LOAD_MENTORS_SUCCESS':
            return {
                ...state,
                mentors: [...state.mentors, ...action.res.mentors],
                hasMore: action.res.hasMore,
                current: action.res.current,
                loading: false,
            }
        
        case 'LOAD_MENTOR_ERROR':

            return {
                ...state,
                loading: false,
                success: false,
            }

        case 'CODE_ERROR':
            return {
                ...state,
                loading: false,
                data: 'there seems to be a problem please refresh your browser',
            }
        default:
            return state

    }
}

export default MentorsReducer;
