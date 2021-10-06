const initState = {
    offres: []
}


const OffreReducer = (state = initState ||undefined, action) => {

    switch (action.type) {

        case 'GET_MY_PROJECT_SUCCESS':
            return {
                ...state,
                offres: action.res
            }

        case 'GET_MY_CONTENTS_SUCCESS':
            return {
                ...state,
                mycontents: action.res.data
            }

        case 'DELETE_MY_CONTENT_SUCCESS':
            return {
                ...state,
                mycontents: action.res.data
            }

        case 'GET_MY_PROJECT_ERROR':

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

export default OffreReducer;
