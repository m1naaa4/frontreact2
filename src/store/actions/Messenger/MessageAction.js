import { Get, Post } from "../../../services/Generale/GeneraleService";


export const GetMessagesListAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_GET_MESSEGES'});

        Get(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
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

