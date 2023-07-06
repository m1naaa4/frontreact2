const initState = {
    comments : []
    }


    const CommentReducer = (state = initState | undefined, action) =>{
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
                    comments :  action.res.comments,
                    hasMore  :  action.res.comments?.meta,
                    current  :  action.res.comments?.meta?.current_page,
                    count    :  action.res.commentcount,
                    loading  :  false
                }

            case 'ADD_COMMENT_SUCCESS':
                let idd = window.location.href.split("/").pop();
                if (action.res.comment?.commentable_id === idd) {
                    state.comments = [action?.res?.comment, ...state?.comments];
                }
                return {
                    ...state,
                    comments    :  state.comments,
                    count       :  action?.res?.commentcount,
                    loading     :  false
                }

            case 'ADD_TO_COLLECTION_COMMENT_SUCCESS':
                let id = window.location.href.split("/").pop();
                if (action.res.commentable_id === id) {
                    state.comments = [action?.res, ...state?.comments];
                }                            
                return {
                    ...state,
                    comments :  state.comments,
                    loading  :  false
                }
            // case 'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS':
            //     console.log(action.res.comments.data,'sperateeeeeeeeeeeeeeeeeeeeeee', state.comments)

            //     // const comments = state.comments;
            //     // comments.forEach(function (c) {
            //     //     let conversation = state.conversations?.[c.id] || {};
            //     //     conversation = {...conversation, ...c}
            //     //     state.conversations = {...state.conversations, ...{[c.id]: conversation}};
            //     // })

            //     // if (action.res.comments?.data?.commentable_id === id) {
            //     //     state.comments = [action?.res?.comments?.data, ...state?.comments];
            //     // }
            //     return {
            //         ...state,
            //         // comments :  [action.res.comments.data, ...state.comments],
            //         // hasMore  :  action.res.comment.meta,
            //         // current  :  action.res.comment.meta,
            //         loading  :  false
            //     }
            
            case 'ADD_TO_COLLECTION_COMMENT_REPLY_SUCCESS':                            
                return {
                    ...state,
                    comments :  [action.feed.data, ...state.comments],
                    // hasMore  :  action.res.comment.meta,
                    // current  :  action.res.comment.meta,
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
    
    export default CommentReducer;
