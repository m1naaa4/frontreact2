const initState = {
    projects: ""
}


const projectReducer = (state = initState, action) => {

    switch (action.type) {

        case 'LOADING':
            return {
                ...state,
                projects:[],
            }
        case 'LOAD_PROJECT_SUCCESS':
            console.log("new state", action.res.result.data)
            console.log("old state", state)
            return {
                ...state,
                // projects:state.projects.push(...action.res.result.data),
                projects: [...state.projects, ...action.res.result.data],
                // projects: action.res,
                hasMore:  action.res.result.hasMore,
                current:  action.res.result.current
            }

        case 'LOAD_PROJECT_ERROR':

            return {
                ...state,
                projects: action.res.result.data,
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
