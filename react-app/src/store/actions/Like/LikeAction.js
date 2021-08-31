import { Post } from "../../../services/Generale/GeneraleService";


export const LikeAction = (data, props, current) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_LIKE'});

        Post(data, props, current).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    // console.log('conversationnnnnnnnnnnnnnns', res)                    
                    dispatch({type:'LIKED_SUCCESS', res});

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