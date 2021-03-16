const initState = {
    url : ""
    }


    const GetFileReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING':
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

          case 'GET_File_UPLOADED_SUCCESS':
              
              return {
                  url:action.response.data.url,
                  id:action.response.data.id,
                  type:action.response.data.type,
              }

              case 'GET_File_UPLOADED_ERROR':

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
    
    export default GetFileReducer;
