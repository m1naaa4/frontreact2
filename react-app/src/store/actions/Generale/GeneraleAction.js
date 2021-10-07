import { generalePost } from "../../../services/User/Profile/ProfileService";


export const ListFavoritesAction = (data) =>{

    return (dispatch)=>{

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_MY_FAVORITES_LIST_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_FAVORITES_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}

export const AddFavoriteAction = (data) =>{

    return (dispatch)=>{

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_MY_FAVORITES_LIST_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_FAVORITES_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}
export const GeneraleAction = (data) =>{

    return (dispatch)=>{
        
        dispatch({type:data.type.upload});

        generalePost(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:data.type.success, res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:data.type.error,res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }
}
