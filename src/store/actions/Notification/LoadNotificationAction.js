import { LoadNotification , SeenNotification} from "../../../services/Generale/GeneraleService";

export const LoadNotificationAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_GET_NOTIFICATIONS'});

        LoadNotification(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'GET_NOTIFICATIONS_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'GET_NOTIFICATIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const SeenNotificationAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_SEEN_NOTIFICATIONS'});

        SeenNotification(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'SEEN_NOTIFICATION_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'SEEN_NOTIFICATION_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

