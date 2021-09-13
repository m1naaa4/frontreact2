import { GetInvitations } from "../../../services/User/Profile/ProfileService";

export const GetInvitationsAction = () =>{

    return (dispatch)=>{

        // dispatch({type:'LOADING_INVITATIONS'});

        GetInvitations().then((res) =>
            {
                if(res.hasOwnProperty('success') && res.success === true){
                    dispatch({type:'LOADING_INVITATIONS_SUCCESS', res});

                }else if(res.hasOwnProperty('success') && res.success === false) {
                    dispatch({type:'LOADING_INVITATIONS_ERROR',res})
                }
            },
            error => {
                dispatch({type:'CODE_ERROR',error});
            }
        )
    }

}