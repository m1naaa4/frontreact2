import { Get, Post } from "../../../services/Generale/GeneraleService";


export const GetMessagesListAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_GET_MESSEGES'});

        Get(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    // console.log('conversationnnnnnnnnnnnnnns', res)
                    res['conversations'].forEach(function (c) {
                        const conversations =  {};
                        const conversation = conversations[c.id];
                        console.log('conversationnnnnnnnnnnnnnns', {...c})
                        conversation = {...conversation, ...c}
                        conversations = {...conversations, ...{[c.id]: conversation}}
                        // console.log('conversationnnnnnnnnnnnnnns', conversations)
                    })
                    dispatch({type:'GET_MESSEGES_SUCCESS', res});

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

        dispatch({type:'LOADING_GET_CONVERSATION'});

        Post(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'GET_CONVERSATION_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'GET_CONVERSATION_ERROR',res})
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

        dispatch({type:'LOADING_SEND_MESSAGE'});

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

