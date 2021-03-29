const initState = {
    infoprofile: ''
}


const ProfileReducer = (state = initState, action, response) => {
    switch (action.type) {

        case 'LOADING_LOAD_PROFILE':
            return {
                ...state,
                infoprofile: 'loading'
            }

        case 'LOAD_PROFILE_SUCCESS':
            console.log(" action.res.profile.infoprofile",  action.res.profile.avatar)
            console.log(" action.res.profile.infoprofile",  action.res.profile.cover)
            return {
                ...state,
                infoprofile: action.res.profile,
            }

        case 'UPDATE_AVATAR_SUCCESS':
            console.log('newAvataaaaaaaaaaaaaaaaaaaar', response.data.url)
        
            return {
                url:response.data.url,
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
