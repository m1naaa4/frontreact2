const initState = {
    avatar: ''
}


const AvatarReducer = (state = initState, action) => {
    switch (action.type) {

        case 'UPDATE_AVATAR_SUCCESS':
            return {
                ...state,
                avatar: action.newAvatar,
            }

        default:
            return state

    }
}

export default AvatarReducer;
