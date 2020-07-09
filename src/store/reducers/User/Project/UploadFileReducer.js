const initState = {
    url : ""
    }


    const uploadFileReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING':
                    return {
                        ...state,
                        url:'loading'
                    }

          case 'File_UPLOADED_SUCCESS':
              console.log('rrrr',action.res)
              return {
                  url:action.res,
              }

              case 'File_UPLOADED_ERROR':

                    return {
                        ...state,
                        url:action.res,
                    }

                    case 'CODE_ERROR':
                            return {
                                ...state,
                                url:'there seems to be a problem please refresh your browser',
                            }
                default:
                    if (action.res === undefined) {

                        return {
                            ...state,
                            url:state
                        }
                    }
                    return state

        }
    }
    
    export default uploadFileReducer;
