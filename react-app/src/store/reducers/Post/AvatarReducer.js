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
        case 'UPDATE_COVER_SUCCESS':
            return {
                ...state,
                cover: action.cover,
            }

        default:
            return state

    }
}

export default AvatarReducer;
