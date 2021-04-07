const initState = {
    notifications : []
    }


    const GetNotificationsReducer = (state= initState || undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_NOTIFICATIONS':
                return {
                    ...state,
                    notifications: state.notifications,
                    loading:true
                }

            case 'GET_NOTIFICATIONS_SUCCESS':
                //console.log('GET_NOTIFICATIONS_SUCCESS', action.res.notifications)
                
              return {
                  ...state,
                  notifications: [...state.notifications, ...action.res.notifications],
                  hasMore:  action.res.hasMore,
                  current:  action.res.current,
                  loading:false
              }

            case 'ADD_TO_COLLECTION_NOTIFICATION_SUCCESS':
                //console.log("usernotisssssssssss", action.res.user_id)

                return {
                    notifications :  [action.feed, ...state.notifications],
                    loading       :  false
                }

            case 'GET_NOTIFICATIONS_ERROR':
                return {
                    ...state,
                    notifications:action.res,
                }
            case 'CODE_ERROR':
                return {
                    ...state,
                    notifications:'there seems to be a problem please refresh your browser',
                }
            default:
                return state

        }
    }
    
    export default GetNotificationsReducer;
