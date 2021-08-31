import {SearchingProject} from "../../../../services/User/Project/SearchService";


export const SearchProjectsAction = (data) =>{

    return (dispatch)=>{

        dispatch({type:'LOADING'});

        SearchingProject(data).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOAD_PROJECT_SUCCESS',res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOAD_PROJECT_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}