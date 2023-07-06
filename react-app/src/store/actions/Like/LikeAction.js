import { PostService } from "../../../services/Like/LikeServices";


export const LikeAction = (data, url) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_LIKE'});

        PostService(data, url).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    // console.log('conversationnnnnnnnnnnnnnns', res)                    
                    //dispatch({type:'LIKED_SUCCeESS', res}); no need because it comes from sockets

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LIKE_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}