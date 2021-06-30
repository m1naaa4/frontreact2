const initState = {
    notification : ''
    }


    const GetAddedNotificationReducer = (state= initState || undefined, action) =>{
        switch(action.type){
        // case 'GET_ADDED_NOTIFICATION_SUCCESS':
        //     //console.log("usernotisssssssssss", action.res.user_id)
        //         return {
        //             notification :  action.feed,
        //             user_id       :  action.res.user_id,
        //             loading       :  false
        //         }
        
        case 'LIKED_SUCCESS':
            console.log('GET_NOTIFICATIONS_SUCCESS', action.res)
            console.log('GET_NOTIFICATIONS_SUCCESS', action.res?.count)
            
            let id = window.location.href.split("/").pop();
            if (action.res.notification?.provider_id === id) {
                state.notification = action.res?.count;
            }                            
            return {
                ...state,
                counterlike :  action.res?.count,
                loading  :  false
            }
        
        case 'COMMENTED_SUCCESS':
            console.log('GET_COMMENT_SUCCESS', action.res)
            console.log('GET_COMMENT_SUCCESS', action.res?.count)
            
            let idd = window.location.href.split("/").pop();
            if (action.res.comment?.provider_id === idd) {
                state.comment = action.res?.count;
            }                            
            return {
                ...state,
                countercomment :  action.res?.count,
                loading  :  false
            }

            default:
                return state

        }
    }
    
    export default GetAddedNotificationReducer;
