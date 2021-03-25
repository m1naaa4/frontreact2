const initState = {
    projects: []
}


const projectReducer = (state = initState ||undefined, action) => {

    switch (action.type) {

        case 'LOADING_ALL_PROJECTS':
            return {
                ...state,
                projects: state.projects,
                loading:true
            }
        case 'LOAD_PROJECT_SUCCESS':
            return {
                ...state,
                projects: [...state.projects, ...action.res.projects],
                hasMore:  action.res.hasMore,
                current:  action.res.current,
                loading:false
            }

        case 'LOAD_PROJECT_ERROR':

            return {
                ...state,
                projects: action.res,
            }

        case 'CODE_ERROR':
            return {
                ...state,
                projects: 'there seems to be a problem please refresh your browser',
            }
        default:
            return state

    }
}

export default projectReducer;
