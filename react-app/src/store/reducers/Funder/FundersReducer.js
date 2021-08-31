const initState = {
    data: '',
    loading: true
}


const FundersReducer = (state = initState ||undefined, action) => {

    switch (action.type) {
        case 'LOADING_ALL_FUNDERS':
            return {
                ...state,
                loading: true,
            }
        case 'LOAD_FUNDER_ONCE_SUCCESS':
            return {
                ...state,
                data: action.res,
                loading: false,
                countlike: action.res?.project?.likeCount,
                countcomment: action.res?.project?.commentCount,
            }

        case 'LOADING_GET_FUNDER':
            return {
                 ...state,
                loading: true,
        }

        case 'GET_FUNDER_SUCCESS':
            return {
                 ...state,
                data: action.res,
                loading: false,
        }
        
        case 'LOAD_FUNDER_ERROR':

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

export default FundersReducer;
