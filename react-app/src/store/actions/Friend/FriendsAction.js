import { generalePost } from "../../../services/User/Profile/ProfileService";

export const InvitationsAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_INVITATIONS_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_INVITATIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const SuggestionsAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_SUGGESTIONS_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_SUGGESTIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const SendRequestFriendAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_SEND_SUGGESTION_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_SUGGESTIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const AcceptFriendAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_ACCEPT_REQUEST_ADD_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_SUGGESTIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const RejectFriendAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_REJECT_REQUEST_ADD_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_SUGGESTIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const FriendsAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_FRIENDS_LIST_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_FRIENDS_LIST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const MyFriendsAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_MY_FRIENDS_LIST_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_FRIENDS_LIST_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const RemoveFriendAction = (data) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_REJECT_REQUEST_ADD_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_SUGGESTIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}