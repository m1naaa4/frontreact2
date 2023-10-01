const initState = {
    funders: [],
    funder: '',
    loading: true
}


const FundersReducer = (state = initState ||undefined, action) => {

    switch (action.type) {
        case 'LOADING_ALL_FUNDERS':
            return {
                ...state,
                loading: true,
            }

        case 'LOAD_FUNDERS_ONCE_SUCCESS':
            state.funders = [];
            return {
                ...state,
                funders: action.res.funders,
                hasMore: action.res.hasMore,
                current: action.res.current,
                loading: false
            }
        case 'LOAD_FUNDERS_SUCCESS':
            return {
                ...state,
                funders: [...state.funders, ...action.res.funders],
                hasMore: action.res.hasMore,
                current: action.res.current,
                loading: false,
            }

        case 'LOADING_GET_FUNDER':
            return {
                ...state,
                loading: true,
            }

        case 'GET_FUNDER_SUCCESS':
            return {
                ...state,
                funder: action.res.funder,
                funderId: action.res.fundertid,
                loading: false,
            }
        
        case 'CREATE_FUNDER_SUCCESS':
            return {
                ...state,
                funder: action.res.funder,
                funderId: action.res.fundertid,
                loading: false,
            }
        
        case 'CREATE_MENTOR_SUCCESS':
            return {
                ...state,
                funder: action.res.funder,
                funderId: action.res.fundertid,
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
