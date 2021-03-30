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

            case 'GET_POSTS_ERROR':
                return {
                    ...state,
                    posts:action.res,
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
