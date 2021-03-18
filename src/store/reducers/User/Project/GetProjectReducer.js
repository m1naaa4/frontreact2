const initState = {
    getproject: ''
}


const getProjectReducer = (state = initState ||undefined, action) => {

    switch (action.type) {

        case 'LOADING_GET_PROJECT':
            return {
                ...state,
                getproject: 'loading',
            }
        case 'GET_PROJECT_SUCCESS':
            return {
                ...state,
                getproject: action.res,
            }

        case 'GET_PROJECT_ERROR':

            return {
                ...state,
                success: false,
            }

        case 'CODE_ERROR':
            return {
                ...state,
                getproject: 'there seems to be a problem please refresh your browser',
            }
        default:
            return state

    }
}

export default getProjectReducer;
