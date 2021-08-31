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
                
              return {
                  ...state,
                  notifications: [...state.notifications, ...action.res.notifications],
                  hasMore:  action.res.hasMore,
                  current:  action.res.current,
                  loading:false
              }

            case 'SEEN_NOTIFICATION_SUCCESS':
                [...state.notifications].filter(function (notification)
                    {
                        if (notification.id === action.data.notification_id) {
                            notification.seen = true;  
                            return true;
                        }
                    });
                return {
                    ...state,
                    // notifications: [...state.notifications],
                }

            
            case 'DELETE_NOTIFICATIONS_SUCCESS':
                
                // [...state.notifications].filter(item => item.id === action.data.notification_id);
                
              return {
                  ...state,
                  notifications: [...state.notifications].filter(item => item.id === action.data.notification_id),
                  loading:false
              }

            

            case 'ADD_TO_COLLECTION_NOTIFICATION_SUCCESS':
                console.log("usernotisssssssssss", action.res)

                return {
                    notifications :  [action.res, ...state.notifications],
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
