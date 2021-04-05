const initState = {
    notifications : ''
    }


    const GetAddedNotificationReducer = (state= initState || undefined, action) =>{
        switch(action.type){
        case 'GET_ADDED_NOTIFICATION_SUCCESS':
            //console.log("usernotisssssssssss", action.res.user_id)
                return {
                    notification :  action.feed,
                    user_id       :  action.res.user_id,
                    loading       :  false
                }

            default:
                return state

        }
    }
    
    export default GetAddedNotificationReducer;
