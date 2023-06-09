const initState = {
    post : ""
    }


    const AddPostReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_ADD_POST':
                return {
                        ...state,
                        post:'loading'
                    }

            case 'ADD_POSsT_SUCCESS':
                return {
                  ...state,
                  post:action.res,
                  postid:action.res.post.id,
              }

            case 'GET_MEDIA_POSTS_SUCCESS':
                return {
                  ...state,
                  media_posts: action.res,
              }

            case 'ADD_POST_ERROR':

                return {
                    ...state,
                    post:action.res,
                }

            case 'CODE_ERROR':
                return {
                        ...state,
                        post:'there seems to be a problem please refresh your browser',
                    }
            default:
                if (action.res === undefined) {

                    return {
                        ...state,
                        post:state
                    }
                    }
                    return state

        }
    }
    
    export default AddPostReducer;
