const initState = {
    post : ""
    }


    const AddPostReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING_ADD_POST':
                    return {
                        ...state,
                        comment:'loading'
                    }

          case 'ADD_POST_SUCCESS':
              return {
                  ...state,
                  comment:action.res,
                  commentid:action.res.comment.id,
              }

              case 'ADD_POST_ERROR':

                    return {
                        ...state,
                        comment:action.res,
                    }

                    case 'CODE_ERROR':
                            return {
                                ...state,
                                comment:'there seems to be a problem please refresh your browser',
                            }
                default:
                    if (action.res === undefined) {

                        return {
                            ...state,
                            comment:state
                        }
                    }
                    return state

        }
    }
    
    export default AddPostReducer;
