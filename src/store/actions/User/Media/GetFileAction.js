import { GetFileService} from "../../../../services/User/Media/MediaService";


export const GetFileAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING'});

        GetFileService(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'GET_File_UPLOADED_SUCCESS',res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'GET_File_UPLOADED_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}