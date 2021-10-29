const initState = {
    data : ''
    }


    const GeneraleVariableReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'TAG':
                return {
                    ...state,
                    tag : action.res,
                }
            case 'COUNT_COMMENT_PROJECT':
                return {
                    ...state,
                    countCommentProject : action.res,
                }

            default:
                return {
                    ...state,
                    tagg : 'there seems to be a problem please refresh your browser',
                }
        }
    }
    
    export default GeneraleVariableReducer;
