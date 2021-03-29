const initState = {
    userProfile: "",
}


const UserReducer = (state = initState, action) => {
    switch (action.type) {

        case 'LOADING_LOAD_USER':
            return {
                ...state,
                userProfile: 'loading',
            }

        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                userProfile: action.res,
            }

        case 'LOAD_USER_ERROR':
            return {
                ...state,
                userProfile: action.res,
            }
        

        case 'CODE_ERROR':
            return {
                ...state,
                userProfile: 'there seems to be a problem please refresh your browser',
            }

        default:
            return state

    }
}

export default UserReducer;
