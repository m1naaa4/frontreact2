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
                action.res['conversations'].forEach(function (c) {
                    let conversation = state.conversations ? state.conversations[action.res.id] : state.conversations|| {};
                    conversation = {...conversation, ...c}
                    state.conversations = {...state.conversations, ...{[c.id]: conversation}};
                })
                console.log('conversations00', state.conversations)
                return {
                    ...state,
                    conversations:  state.conversations,
                    // hasMore      :  action.res.hasMore,
                    // current      :  action.res.current,
                    loading      :  false
                }

            case 'LOAD_MESSAGE_SUCCESS':
                console.log('conversations1', state.conversations)
                let conversation = state.conversations ? state.conversations[action.res.id] : state.conversations || {};
                conversation.messages = state.conversations ? action.res.data.messages : {}
                // action.res['messages'].forEach(function (conversation) {
                //     state.conversations[conversation.receiver_id] = conversation;
                // })
                // console.log('conversations', state.conversations)
                // console.log('conversations10', conversation)
                // console.log('conversations11', state.conversations)
                // console.log('conversations2', {[action.res.id]: conversation.messages})
                return {
                    ...state,
                    conversations: {...state.conversations, ...conversation},
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
