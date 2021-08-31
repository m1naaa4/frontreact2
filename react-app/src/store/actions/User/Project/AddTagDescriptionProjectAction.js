import {ProjectServices} from "../../../../services/User/Project/SearchService";


export const AddTagDescriptionProjectsAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING'});

        ProjectServices(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_PROJECT_SUCCESS',res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_PROJECT_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}