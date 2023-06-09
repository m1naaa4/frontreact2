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
            window.globalLoggedUser = action.res.user;
            return {
                ...state,
                userProfile: action.res.user,
            }

        case 'LOADING_INVITATIONS_SUCCESS':
            return {
                ...state,
                invitations: action.res.data,
                countinvitations: action.res.count,
            }

        case 'LOADING_SUGGESTIONS_SUCCESS':
            return {
                ...state,
                suggestions: action.res.data,
                countsuggestions: action.res.count,
            }

        case 'LOADING_FRIENDS_LIST_SUCCESS':
            return {
                ...state,
                friends: action.res.data,
                count: action.res.count,
            }

        case 'LOADING_MY_FRIENDS_LIST_SUCCESS':
            return {
                ...state,
                myfriends: action.res.data,
            }

        case 'LOADING_GET_FAVORITES':
            return {
                ...state,
                favorites: action.res.data,
                loading: true
            }
            
        case 'LOADING_MY_FAVORITES_LIST_SUCCESS':
            return {
                ...state,
                favorites: action.res.data,
                loading: false
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
