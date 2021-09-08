import { deleteNotification, LoadNotification , MarkSeen, SeenNotification} from "../../../services/Generale/GeneraleService";

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


        SeenNotification(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'SEEN_NOTIFICATION_SUCCESS', data});

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

export const MarkSeenAction = (data) =>{

    return (dispatch)=>{


        MarkSeen(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){

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

export const DeleteNotificationAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'DELETE_NOTIFICATIONS_SUCCESS', data});

        deleteNotification(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    // dispatch({type:'DELETE_NOTIFICATIONS_SUCCESS', res});

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

