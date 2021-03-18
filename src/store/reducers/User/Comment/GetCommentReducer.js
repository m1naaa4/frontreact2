const initState = {
    comments : []
    }


    const GetCommentReducer = (state= initState | undefined, action) =>{
        switch (action.type) {

            case 'LOADING_GET_COMMENT':
                
                return {
                    ...state,
                    comments: [],
                    loading : true,
                }
            case 'GET_COMMENT_SUCCESS':
                return {
                    ...state,
                    comments :  [...state.comments, ...action.res.comment.data],
                    hasMore  :  action.res.comment.meta,
                    current  :  action.res.comment.meta.current_page,
                    loading  :  false
                }

            case 'GET_COMMENT_ERROR':

                return {
                    ...state,
                    comments: action.res,
                }

            case 'CODE_ERROR':
                return {
                    ...state,
                    comments: 'there seems to be a problem please refresh your browser',
                }
            default:
                return state

        }
    }
    
    export default GetCommentReducer;
