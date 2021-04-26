import { Get, Post, PostMessage } from "../../../services/Generale/GeneraleService";


export const GetMessagesListAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_CONVERSATIONS'});

        Get(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    // console.log('conversationnnnnnnnnnnnnnns', res)                    
                    dispatch({type:'LOAD_CONVERSATIONS_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'GET_MESSEGES_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const GetConversationAction = (data, props, current) =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_CONVERSATIONS'});

        PostMessage(data, props, current).then((res) =>
            {
                if(res.data.hasOwnProperty('success') && res.data.success === true){
                    dispatch({type:'LOAD_MESSAGE_SUCCESS', res});

                }else if(res.data.hasOwnProperty('success') && res.data.success === false) {
                    dispatch({type:'LOAD_MESSEGES_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

export const SendMessageAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_CONVERSATIONS'});

        Post(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'SEND_MESSAGE_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'SEND_MESSAGE_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}

