const initState = {
    project: ''
}


const getProjectReducer = (state = initState ||undefined, action) => {

    switch (action.type) {

        case 'LOADING':
            return {
                ...state,
                project: state.project,
            }
        case 'GET_PROJECT_SUCCESS':
            return {
                ...state,
                project: action.res.project,
            }

        case 'GET_PROJECT_ERROR':

            return {
                ...state,
                success: false,
            }

        case 'CODE_ERROR':
            return {
                ...state,
                project: 'there seems to be a problem please refresh your browser',
            }
        default:
            return state

    }
}

export default getProjectReducer;
