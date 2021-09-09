const initState = {
    youtube : ""
    }


    const AddYoutubeReducer = (state= initState | undefined, action) =>{
        switch(action.type){

            
            case 'GET_YOUTUBE_SUCCESS':

                return {
                    ...state,
                    youtube:action.res,
                }

            default:
                if (action.res === undefined) {

                    return {
                        ...state,
                        youtube:state
                    }
                    }
                    return state

        }
    }
    
    export default AddYoutubeReducer;
