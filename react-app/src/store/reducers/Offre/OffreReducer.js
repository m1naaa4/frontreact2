const initState = {
    offres: []
}


const OffreReducer = (state = initState || undefined, action) => {

    switch (action.type) {

        case 'LOADING_GET_MY_PROJECT':
            return {
                ...state,
                offres: state.offres,
                loading: true
            }
        case 'GET_MY_PROJECT_SUCCESS':
            return {
                ...state,
                offres: action.res,
                loading: false
            }

        case 'GET_MY_CONTENTS_SUCCESS':
            return {
                ...state,
                mycontents: action.res.data,
                loading: false
            }

        case 'DELETE_MY_CONTENT_SUCCESS':
            return {
                ...state,
                mycontents: [...state.mycontents].filter(item => item.id !== action.data.provider_id)
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
