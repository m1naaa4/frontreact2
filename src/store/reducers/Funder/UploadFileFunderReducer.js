const initState = {
    file : ""
    }


    const UploadFileFunderReducer = (state= initState | undefined, action) =>{
        switch(action.type){

        case 'LOADING':            
            return {
                ...state,
                file :'loading'
            }               

        case 'File_UPLOADED_SUCCESS':
              
            return {
                ...state,
                file     :action.response.data,
                type     :action.response.data.type,
                fileurl     :action.response.data.url,
            }

        case 'File_UPLOADED_ERROR':

            return {
                ...state,
                file     :action.action.response.data.url,
            }

        case 'CODE_ERROR':
            return {
                ...state,
                file     :'there seems to be a problem please refresh your browser',
            }
        default:
            if (action.res === undefined) {

                return {
                    ...state,
                    file :state
                }
            }
            return state

        }
    }
    
    export default UploadFileFunderReducer;
