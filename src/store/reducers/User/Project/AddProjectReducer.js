const initState = {
    project : ""
    }


    const addprojectReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING':
                    return {
                        ...state,
                        project:{'success':false,'result':{},'loading':true}
                    }

          case 'ADD_PROJECT_SUCCESS':
              return {
                  ...state,
                  project:action.res.result,
              }

              case 'ADD_PROJECT_ERROR':

                    return {
                        ...state,
                        project:action.res,
                    }

                    case 'CODE_ERROR':
                            return {
                                ...state,
                                project:'there seems to be a problem please refresh your browser',
                            }
                default:
                    if (action.res === undefined) {

                        return {
                            ...state,
                            project:{'success':false,'result':{}}
                        }
                    }
                    return state

        }
    }
    
    export default addprojectReducer;
