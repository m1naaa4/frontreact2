const initState = {
    addproject : ""
    }


    const addprojectReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING_ADD_PROJECT':
                    return {
                        ...state,
                        addproject:'loading'
                    }

          case 'ADD_PROJECT_SUCCESS':
              return {
                  ...state,
                  addproject:action.res,
                  projectid:action.res.project.id,
                  success:action.res.success,
              }
              case 'CLEAR_STATE_PROJECT_SUCCESS':
                return {
                    ...state,
                    addproject:null,
                    getproject:null,
                    projectid:null,
                }

              case 'ADD_PROJECT_ERROR':
                    return {
                        ...state,
                        addproject:action.res,
                    }

                    case 'CODE_ERROR':
                            return {
                                ...state,
                                addproject:'there seems to be a problem please refresh your browser',
                            }
                default:
                    if (action.res === undefined) {

                        return {
                            ...state,
                            addproject:state
                        }
                    }
                    return state

        }
    }
    
    export default addprojectReducer;
