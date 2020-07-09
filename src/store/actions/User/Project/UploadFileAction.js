import { UploadFileService} from "../../../../services/User/Project/SearchService";


export const UploadFileAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING'});

        UploadFileService(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'File_UPLOADED_SUCCESS',res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'File_UPLOADED_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}