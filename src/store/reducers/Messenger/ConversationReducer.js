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

            case 'GET_CONVERSATION_SUCCESS':
                return {
                    ...state,
                    messages: [...state.messages, ...action.res.messages],
                    user: action.res.user,
                    loading:false
                }
            
            case 'SEND_MESSAGE_SUCCESS':
                console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', JSON.stringify(action.res.message))
                return {
                    ...state,
                    messages: [...state.messages, action.res.message],
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
