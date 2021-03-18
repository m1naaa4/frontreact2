import {ProjectServices} from "../../../../services/User/Project/ProjectServices";


export const AddProjectsAction = (data, props, url, navigation) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING_ADD_PROJECT'});

        ProjectServices(data, props, url, navigation).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_PROJECT_SUCCESS',res});
                    const { next } = navigation;
                        next()
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