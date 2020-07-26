const initState = {
    project : ""
    }


    const addtagDescriptionprojectReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING':
                    return {
                        ...state,
                        project:'loading'
                    }

          case 'ADD_PROJECT_SUCCESS':
              return {
                  ...state,
                  project:action.res,
                  projectid:action.res.project.id,
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
                            project:state
                        }
                    }
                    return state

        }
    }
    
    export default addtagDescriptionprojectReducer;
