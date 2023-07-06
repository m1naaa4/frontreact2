// import {GetMyProject, GetProject, FunderServices, Listing, GetView} from "../../../services/Funder/FunderServices";

import { GetMyProject, GetProject, GetService, GetView, Listing, PostService, UpdateService } from "../../../services/Funder/FunderServices";


export const CreateFunderAction = (data, url, navigation, history, step) => {
    return (dispatch)=>{
        dispatch({type:'LOADING_CREATE_FUNDER'});

        PostService(data, url, navigation, history, step).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'CREATE_FUNDER_SUCCESS',res});
                    if (navigation) {
                        if (step != 'step3') {
                            const {
                                next
                            } = navigation;
                            next();
                            history.push('/funder/create/' + res.funderid + '/' + step);
                        }
                    }
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'CREATE_FUNDER_ERROR',res})
                }

            },
            error => {
                dispatch({type:'CREATE_FUNDER_CODE_ERROR',error});
            }
        )
    }

}

export const SaveDescriptionFunderAction = (data, props, url, navigation) =>{
    return (dispatch)=>{

        dispatch({type:'LOADING_CREATE_FUNDER'});

        PostService(data, props, url, navigation).then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'CREATE_FUNDER_SUCCESS',res});
                    const { next } = navigation;
                        next()
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'CREATE_FUNDER_ERROR',res})
                }

            },
            error => {
                dispatch({type:'CREATE_FUNDER_CODE_ERROR',error});
            }
        )
    }
}

export const UpdateFunderAction = (data, url) =>
{
    return (dispatch)=>
    {
        dispatch({type:'LOADING_ADD_FUNDER'});

        UpdateService( data, url ).then((res) =>
        {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'ADD_FUNDER_SUCCESS',res});
                      
                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'ADD_FUNDER_ERROR',res})
                }
        },
        error => {
            dispatch({type:'CODE_ERROR',error});
        }
    )}
}


export const ClearProjectsAction = () =>{

    return (dispatch)=>{

        dispatch({type:'CLEAR_STATE_PROJECT_SUCCESS'});
    }

}

export const GetFunders = (data, current) =>{
    return (dispatch) =>
    {
        dispatch({type:'LOADING_ALL_FUNDERS'});
        Listing(data, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                // dispatch({type:'LOAD_FUNDERS_SUCCESS', res});
                if (res.filters == true) {
                    dispatch({
                        type: 'LOAD_FUNDERS_ONCE_SUCCESS',
                        res
                    });
                }
                
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'LOAD_FUNDER_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'CODE_ERROR',error});
        }
        )
    }
}

export const loadFunderOnceAction = (data, current) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING_ALL_FUNDERS'
        });
        Listing(data, current).then((res) => {

                if (res.hasOwnProperty('success') && res.success === true) {
                    dispatch({
                        type: 'LOAD_FUNDERS_ONCE_SUCCESS',
                        res
                    });

                } else if (res.hasOwnProperty('success') && res.success === false) {
                    dispatch({
                        type: 'LOAD_FUNDER_ERROR',
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

export const GetFunder = (current) =>{

    return (dispatch) =>
    {
        dispatch({type:'LOADING_GET_FUNDER'});
        GetService(current).then((res) => {

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_FUNDER_SUCCESS', res});
                /* if (res.filters == true) {
                    dispatch({type:'LOAD_FUNDER_FILTERS_SUCCESS', res});
                } */
                
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_FUNDER_ERROR',res})
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
        dispatch({type:'LOADING_GET_PROJECT'});

        GetProject(data,props, current).then((res)=>{

            if(res.hasOwnProperty('success') && res.success === true){
                dispatch({type:'GET_PROJECT_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_PROJECT_ERROR',res})
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
                dispatch({type:'GET_MY_PROJECT_SUCCESS', res});
            }
            else if(res.hasOwnProperty('success') && res.success === false) {
                dispatch({type:'GET_MY_PROJECT_ERROR',res})
            }
        },
        error=>{
            dispatch({type:'GET_ERROR',error});
        }
        )
    }
    
}

