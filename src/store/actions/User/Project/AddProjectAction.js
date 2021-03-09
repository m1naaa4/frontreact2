import {ProjectServices} from "../../../../services/User/Project/SearchService";


export const AddProjectsAction = (data, props, url) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING'});

        ProjectServices(data, props, url).then((res) =>
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