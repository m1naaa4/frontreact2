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
                    // console.log('conversationssssssss', state?.conversations)
                    // console.log('conversations0', conversation)
                    // console.log('action?.res?.id', c.id)
                    conversation = {...conversation, ...c}
                    state.conversations = {...state.conversations, ...{[c.id]: conversation}};
                })
                // console.log('conversations00', state.conversations)
                return {
                    ...state,
                    conversations:  state.conversations,
                    // hasMore      :  action.res.hasMore,
                    // current      :  action.res.current,
                    loading      :  false
                }

            case 'LOAD_MESSAGE_SUCCESS':
                console.log('conversations1', state.conversations)
                console.log('action.res.idddd', action.res.id)
                const conversation = state?.conversations?.[action?.res?.id];
                conversation.messages = action?.res?.data?.messages
                // action.res['messages'].forEach(function (conversation) {
                //     state.conversations[conversation.receiver_id] = conversation;
                // })
                console.log('convvvvvvvvversations', conversation)
                // console.log('conversations10', conversation)
                // console.log('conversations11', state.conversations)
                // console.log('conversations2', {[action.res.id]: conversation.messages})
                return {
                    ...state,
                    conversations: {...state.conversations},
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
