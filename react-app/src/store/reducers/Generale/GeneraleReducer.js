const initState = {
    data : ''
    }


    const GeneraleReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            case 'LOADING_UPDATE_VISIBILITY':
                return {
                        ...state,
                        visibility:true
                    }

            case 'UPDATE_VISIBILITY_SUCCESS':
                return {
                  ...state,
                  visibility:false,
              }

            case 'UPDATE_VISIBILITY_ERROR':

                return {
                    ...state,
                    visibility:false,
                }

            case 'CODE_ERROR':
                return {
                        ...state,
                        visibility:'there seems to be a problem please refresh your browser',
                    }
            default:
                return {
                    ...state,
                    visibility:'there seems to be a problem please refresh your browser',
                }

        }
    }
    
    export default GeneraleReducer;
