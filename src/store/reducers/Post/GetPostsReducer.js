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

            case 'ADD_TO_COLLECTION_POST_SUCCESS':
                return {
                    posts :  [action.feed, ...state.posts],
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
