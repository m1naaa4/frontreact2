const initState = {
    url : ""
    }


    const uploadFileReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING':
                    console.log('rrrr',state)
                    if (state !== 'loading') {
                        return {
                            ...state,
                            url: state.url
                        }
                    } else {
                        return {
                            ...state,
                            url:'loading'
                        }
                    }

          case 'File_UPLOADED_SUCCESS':
              
              return {
                  url:action.response.data.url,
                  id:action.response.data.id,
                  type:action.response.data.type,
              }

              case 'File_UPLOADED_ERROR':

                    return {
                        ...state,
                        url:action.action.response.data.url,
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
