const initState = {
    conversations : {}
    }


    const ConversationsReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_MEeSSEGES':
                return {
                    ...state,
                    conversations:state.conversations,
                    loading:true
                    }

            case 'GET_MESSEGES_SUCCESS':
                let conversations = {};
                action.res['conversations'].forEach(function (c) {
                    let conversation = state.conversations ? state.conversations[action.res.id] : state.conversations|| {};
                    conversation = {...conversation, ...c}
                    conversations = {...conversations, ...{[c.id]: conversation}};
                })
                console.log('conversations00', conversations)
                return {
                    ...state,
                    conversations:  conversations,
                    // hasMore      :  action.res.hasMore,
                    // current      :  action.res.current,
                    loading      :  false
                }

            case 'GET_CONVERSATION_SUCCESS':
                console.log('conversations1', state.conversations)
                let conversation = state.conversations ? state.conversations[action.res.id] : state.conversations|| {};
                conversation.messages = action.res.data.messages
                // action.res['messages'].forEach(function (conversation) {
                //     state.conversations[conversation.receiver_id] = conversation;
                // })
                // console.log('conversations', state.conversations)
                // console.log('conversations1', conversation.messages)
                console.log('conversations2', {...state.conversations, ...{[action.res.id]: conversation.messages}})
                return {
                    ...state,
                    conversations: {...state.conversations, ...{[action.res.id]: conversation.messages}},
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
