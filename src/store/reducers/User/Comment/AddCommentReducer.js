const initState = {
    comment : ""
    }


    const AddCommentReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING_ADD_COMMENT':
                    return {
                        ...state,
                        comment:'loading'
                    }

          case 'ADD_COMMENT_SUCCESS':
              return {
                  ...state,
                  comment:action.res,
                  commentid:action.res.comment.id,
              }

              case 'ADD_COMMENT_ERROR':

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
    
    export default AddCommentReducer;
