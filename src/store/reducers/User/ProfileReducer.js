const initState = {
    infoprofile: ''
}


const ProfileReducer = (state = initState, action) => {
    switch (action.type) {

        case 'LOADING_LOAD_PROFILE':
            return {
                ...state,
                infoprofile: 'loading'
            }

        case 'LOAD_PROFILE_SUCCESS':
            return {
                ...state,
                infoprofile: action.res.profile,
            }

        case 'LOAD_PROFILE_ERROR':
            return {
                ...state,
                infoprofile: action.res,
            }
        

        case 'CODE_ERROR':
            return {
                ...state,
                infoprofile: 'there seems to be a problem please refresh your browser',
            }

        default:
            return state

    }
}

export default ProfileReducer;
