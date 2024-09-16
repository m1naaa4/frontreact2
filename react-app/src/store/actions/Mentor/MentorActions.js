import { GetMyProject, GetProject, GetService, Listing, PostService, UpdateServiceMentor } from "../../../services/Mentor/MentorServices";
import { UploadLogoAction } from "../Media/MediaAction";



export const CreateMentorAction = (data, url, navigation, history, step, file) => {
    return (dispatch)=>{

        dispatch({type:'LOADING_CREATE_MENTOR'});

        PostService(data, url, navigation, history, step, file).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'CREATE_MENTOR_SUCCESS',res});
                    if (file && file != '') {                        
                        dispatch(UploadLogoAction(res.mentorid, file, 'mentor', 'image', '/upload'));
                    }
                    if (navigation) {
                        if (step != 'step3') {
                            const {
                                next
                            } = navigation;
                            next();
                            history.push('/mentor/create/' + res.mentorid + '/' + step);
                        }
                    }
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'CREATE_MENTOR_ERROR',res})
                }

            },
            error => {
                dispatch({type:'CREATE_MENTOR_CODE_ERROR',error});
            }
        )
    }

}

export const SaveDescriptionMenorAction = (data, props, url, navigation) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_CREATE_MENTOR'});

        PostService(data, props, url, navigation).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'CREATE_MENTOR_SUCCESS',res});
                    const { next } = navigation;
                        next()
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'CREATE_MENTOR_ERROR',res})
                }

            },
            error => {
                dispatch({type:'CREATE_MENTOR_CODE_ERROR',error});
            }
        )
    }
}

export const UpdateMentorAction = (data, url) =>
{
    return (dispatch)=>
    {
        dispatch({type:'LOADING_ADD_MENTOR'});

        UpdateServiceMentor( data, url ).then((res) =>
        {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_MENTOR_SUCCESS',res});
                      
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_MENTOR_ERROR',res})
                }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
    )}
}


export const ClearProjectsAction = () =>{

    return (dispatch)=>{

        dispatch({type:'CLEAR_STATE_MENTOR_SUCCESS'});
    }

}

export const GetMentors = (data, current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_ALL_MENTORS'});
        Listing(data, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                // dispatch({type:'LOAD_MENTORS_SUCCESS', res});
                if (res.filters == true) {
                    dispatch({
                        type: 'LOAD_MENTORS_ONCE_SUCCESS',
                        res
                    });
                }
                
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'LOAD_MENTOR_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
}

export const loadMentorOnceAction = (data, current) => {

    return (dispatch) => {
        dispatch({
            type: 'LOADING_ALL_MENTORS'
        });
        Listing(data, current).then((res) => {

                if (res.hasOwnProperty('success') && res.success === true) {
                    dispatch({
                        type: 'LOAD_MENTORS_ONCE_SUCCESS',
                        res
                    });

                } else if (res.hasOwnProperty('success') && res.success === false) {
                    dispatch({
                        type: 'LOAD_MENTOR_ERROR',
                        res
                    })
                }
            },
            error => {
                dispatch({
                    type: 'CODE_ERROR',
                    error
                });
            }
        )
    }

}

export const GetMentor = (current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_MENTOR'});
        GetService(current).then((res) => {

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_MENTOR_SUCCESS', res});
                /* if (res.filters == true) {
                    dispatch({type:'LOAD_FUNDER_FILTERS_SUCCESS', res});
                } */
                
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_MENTOR_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
    
}


export const GetProjectAction = (data, props, current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_MENTOR'});

        GetProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_MENTOR_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_MENTOR_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'GET_ERROR',error});
        }
        )
    }
    
}

export const getMyOffresAction = (data, props, current) =>{

    return (dispatch) =>
    {
        GetMyProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_MY_MENTOR_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_MY_MENTOR_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'GET_ERROR',error});
        }
        )
    }
    
}

