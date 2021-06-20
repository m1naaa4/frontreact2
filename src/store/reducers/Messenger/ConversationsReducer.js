const initState = {
    conversations : {}
    }


    const ConversationsReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_CONVERSATIONS':
                return {
                    ...state,
                    conversations:state.conversations,
                    loading:true
                    }

            case 'LOAD_CONVERSATIONS_SUCCESS':
                const allconversations = action?.res?.['conversations'];
                allconversations.forEach(function (c) {
                    let conversation = state.conversations?.[c.id] || {};
                    conversation = {...conversation, ...c}
                    state.conversations = {...state.conversations, ...{[c.id]: conversation}};
                })
                return {
                    ...state,
                    conversations:  state.conversations,
                    loading      :  false
                }

            case 'LOAD_MESSAGE_SUCCESS':
                const conversation = state?.conversations?.[action?.res?.id] || {};
                conversation.messages = action?.res?.data?.messages ;
                conversation.count = action?.res?.data?.count ;
                return {
                    ...state,
                    conversations: {...state.conversations},
                    loading:false
                }
            
            case 'SEND_MESSAGE_SUCCESS':
                const convt = state?.conversations?.[action?.res?.message?.receiver_id] || {};
                convt.messages = convt.messages.concat(action?.res?.message);
                return {
                    ...state,
                    loading:false
                } 

            case 'SEND_MESSAGE_SUCCESS_PUSHER':
                const convtP = state?.conversations?.[action?.res?.message?.sender_id] || {};
                convtP.messages = convtP.messages?.concat(action?.res?.message);
                return {
                    ...state,
                    loading:false
                }
                

            case 'LOAD_CONVERSATIONS_ERROR':

                return {
                    ...state,
                    conversations:action.res,
                }

            case 'CODE_ERROR':
                return {
                    ...state,
                    conversations:'there seems to be a problem please refresh your browser',
                }
            default:
                return state

        }
    }
    
    export default ConversationsReducer;
