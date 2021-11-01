const initState = {
    posts : []
    }


    const GetPostsReducer = (state= initState || undefined, action) =>{
        switch(action.type){

            case 'LOADING_GET_POSTS':
                return {
                    ...state,
                    posts: state.posts,
                    loading:true
                }

            case 'GET_POSTS_SUCCESS':
                console.log(action.res)
              return {
                  ...state,
                  posts: [...state.posts, ...action.res.posts],
                  hasMore:  action.res.hasMore,
                  current:  action.res.current,
                  loading:false
              }

            case 'LOAD_POSTS_FILTERS_SUCCESS':
                return {
                    ...state,
                    posts: action.res.posts,
                    hasMore:  action.res.hasMore,
                    current:  action.res.current,
                    loading:false
                }

            case 'CLEAR_POSTS_LIST':
                return {
                    posts: [],
                    loading:false
                }
            
            case 'ADD_POST_SUCCESS':

                state.posts = [action.res.post, ...state.posts];
                return {
                    posts :  state.posts,
                    loading  :  false
                }

            case 'ADD_TO_COLLECTION_COMMENT_POST_SUCCESS':
                console.log('hereeeeeeeeeeeeeee', action.res.comments)
                const allposts = state.posts;
                allposts.forEach(function (post) {
                    if (action.res.comments?.commentable_id === post.id) {
                       post.comments.unshift(action.res.comments);
                    }                    
                });
                return {
                    ...state,
                    posts :  allposts,
                    commentCount :  action.res?.commentcount,
                    // likeCount    :  likeCount,
                    // comments :  [action.res.comments.data, ...state.comments],
                    // hasMore  :  action.res.comment.meta,
                    // current  :  action.res.comment.meta,
                    // loading  :  false
                }
            
            case 'ADD_Like_TO_POST_SUCCESS':                    
                const allpostslike = state.posts;
                allpostslike.forEach(function (post) {
                    if (action.res?.notification?.provider_id === post.id) {     
                        console.log('hereeeeeeeeeeeeeee', post.likeCount = action.res?.count)
                    }                    
                })                
                return {
                    ...state,
                    posts :  state.posts,
                    loading  :  false
                }

            case 'DELETE_POST_SUCCESS':
                return {
                    ...state,
                    posts : [...state.posts].filter(item => item.id !== action.id),
                }

            case 'GET_POSTS_ERROR':
                return {
                    ...state,
                    posts:state.posts,
                }
            case 'CODE_ERROR':
                return {
                    ...state,
                    posts:'there seems to be a problem please refresh your browser',
                }
            default:
                return state

        }
    }
    
    export default GetPostsReducer;
