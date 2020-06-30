const initState = {
    projects: []
}


const projectReducer = (state = initState ||undefined, action) => {

    switch (action.type) {

        case 'LOADING':
            return {
                ...state,
                projects: state.projects,
                loading:true
            }
        case 'LOAD_PROJECT_SUCCESS':
            return {
                ...state,
                projects: [...state.projects, ...action.res.result.data],
                hasMore:  action.res.result.hasMore,
                current:  action.res.result.current,
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
            console.log("default here ", state)
            return state

    }
}

export default projectReducer;
