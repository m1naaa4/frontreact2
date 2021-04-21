const initState = {
    conversations : {}
    }


    const ConversationsReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_MESSEGES':
                return {
                    ...state,
                    conversations:state.conversations,
                    loading:true
                    }

            case 'GET_MESSEGES_SUCCESS':
                let conversations = {};
                action.res['conversations'].forEach(function (conversation) {
                    conversations[conversation.id] = conversation;
                })

                return {
                    ...state,
                    conversations:  conversations,
                    hasMore      :  action.res.hasMore,
                    current      :  action.res.current,
                    loading      :  false
                }

            case 'GET_CONVERSATION_SUCCESS':
                let conversation = state.conversations || {};
                conversation.messages = state.messages
                // action.res['messages'].forEach(function (conversation) {
                //     state.conversations[conversation.receiver_id] = conversation;
                // })
                console.log('conversationsss', state.conversations, conversation)
                return {
                    ...state,
                    messages: action.res.messages,
                    user: action.res.user,
                    loading:false
                }

            case 'GET_MESSEGES_ERROR':

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
