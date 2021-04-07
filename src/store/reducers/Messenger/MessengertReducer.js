const initState = {
    conversations : []
    }


    const MessengerReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_MESSEGES':
                return {
                    ...state,
                    conversations:state.conversations,
                    loading:true
                    }

            case 'GET_MESSEGES_SUCCESS':
                return {
                    ...state,
                    conversations: action.res.conversations,
                    hasMore:  action.res.hasMore,
                    current:  action.res.current,
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
    
    export default MessengerReducer;
