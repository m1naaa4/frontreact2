const initState = {
    funder : ""
    }


    const CreateFunderReducer = (state= initState | undefined, action) =>{
        switch(action.type){

                case 'LOADING_CREATE_FUNDER':
                    return {
                        ...state,
                        funder:'loading'
                    }

          case 'CREATE_FUNDER_SUCCESS':
              return {
                  ...state,
                  funder:action.res,
                  funderId:action.res.project.id,
                  success:action.res.success,
              }
              case 'CLEAR_STATE_PROJECT_SUCCESS':
                return {
                    ...state,
                    funder:null,
                    getproject:null,
                    funderId:null,
                }

              case 'CREATE_FUNDER_ERROR':
                    return {
                        ...state,
                        funder:action.res,
                    }

                    case 'CREATE_FUNDER_CODE_ERROR':
                            return {
                                ...state,
                                funder:'there seems to be a problem please refresh your browser',
                            }
                default:
                    if (action.res === undefined) {

                        return {
                            ...state,
                            funder:state
                        }
                    }
                    return state

        }
    }
    
    export default CreateFunderReducer;
