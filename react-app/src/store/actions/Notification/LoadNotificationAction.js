import { deleteNotification} from "../../../services/Generale/GeneraleService";
import { DeleteService, GetService, PostService } from "../../../services/Notification/NotificationServices";

export const LoadNotificationAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_GET_NOTIFICATIONS'});

        GetService(data).then((res) =>
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

export const SeenNotificationAction = (data, url) =>{

    return (dispatch)=>{


        PostService(data, url).then((res) =>
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

export const MarkSeenAction = (data, url) =>{

    return (dispatch)=>{


        PostService(data, url).then((res) =>
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

export const DeleteNotificationAction = (data, url) =>{

    return (dispatch)=>{

        dispatch({type:'DELETE_NOTIFICATIONS_SUCCESS', data});

        DeleteService(data, url).then((res) =>
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

