import { generalePost } from "../../../services/User/Profile/ProfileService";


export const ListFavoritesAction = (data) =>{

    return (dispatch)=>{

        generalePost(data).then((res) =>
            {
                dispatch({ type: 'LOADING_GET_FAVORITES', res });

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
