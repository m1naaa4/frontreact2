const initState = {
    messages : []
    }


    const ConversationReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_CONVERSATION':
                return {
                    ...state,
                    messages:state.messages,
                    loading:true
                    }

            case 'GET_CONVERSATION_SUCCESS':
                console.log('hereeeeeeeeeeeeeeeeeeee', action.res)
                return {
                    ...state,
                    messages: action.res,
                    loading:false
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
