const initState = {
    messages : []
    }


    const ConversationReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_CONVERSATION':
                return {
                    ...state,
                    messages:[],
                    loading:true
                    }

            case 'GET_CONVERSATION_SUCcCESS':
                let conversations = {};
                action.res['messages'].forEach(function (conversation) {
                    conversations[conversation.receiver_id] = conversation;
                })
                return {
                    ...state,
                    messages: action.res.messages,
                    user: action.res.user,
                    loading:false
                }
            
            case 'SEND_MESSAGE_SUCCESS':

                // state.messages.forEach(function (conversation) {

                //     if(conversation['receiver_id'] == action.res.message.receiver_id){
                //         return {
                //             ...state,
                //             messages: [...state.messages, action.res.message],
                //             // loading:false
                //         }
                //     }
                    
                    
                // });

                // let receiver_id = action.res.message.receiver_id;
                // let feed = {[receiver_id]:state.messages};
                return {
                    ...state,
                    messages:  state.messages,
                    // loading:false
                }
    
                
            case 'GET_CONVERSATION_ERROR':

                return {
                    ...state,
                    messages:action.res,
                }

            case 'CODE_ERROR':
                return {
                    ...state,
                    messages:'there seems to be a problem please refresh your browser',
                }
            default:
                return state

        }
    }
    
    export default ConversationReducer;
