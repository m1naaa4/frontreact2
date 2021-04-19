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
                // action.res['conversations'].forEach(function (c) {
                //     const conversations =  action.res.conversations;
                //     let conversation = conversations[c.id] || {};
                    
                //     conversation = {...conversation, ...c};
                //     console.log('conversationnnnaaaaaaaaaaaaaaaaaaaannnnnnnnnnns', ...conversation)
                //     // console.log('conversationnnnnnnnnnnnnnns', {[c.id]: conversation})
                //     console.log('conversationnnnnnnnnnnnnnns', c)
                //     if ({[c.id]: conversation}) {
                //          console.log('conversationnnnnnzzzzzzzznnnnnnnnns', ...conversation)
                //     // conversations = {...conversations, ...{[c.id]: conversation}}
                //     }
                   
                //     // console.log('conversationnnnnnnnnnnnnnns', conversations)
                // });
                return {
                    ...state,
                    conversations:  action.res.conversations,
                    hasMore      :  action.res.hasMore,
                    current      :  action.res.current,
                    loading      :  false
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
