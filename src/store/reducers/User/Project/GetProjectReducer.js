const initState = {
    projects: ''
}


const getProjectReducer = (state = initState ||undefined, action) => {

    switch (action.type) {

        case 'LOADING':
            return {
                ...state,
                projects: state.projects,
                loading:true
            }
        case 'GET_PROJECT_SUCCESS':
            return {
                ...state,
                projects: action.res.result,
            }

        case 'GET_PROJECT_ERROR':

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

export default getProjectReducer;
