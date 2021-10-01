const initState = {
    settings: "",
}


const SettingReducer = (state = initState, action) => {
    switch (action.type) {

        case 'LOADING_LOAD_TEAMS':
            return {
                ...state,
                settings: 'loading',
            }

        case 'LOAD_TEAMS_SUCCESS':
            return {
                ...state,
                teams: action.res.teams,
            }
        case 'ADD_TEAMS_SUCCESS':
            state.teams.unshift(action.res.team);
            return {
                ...state,
                teams : state.teams,
            }
        case 'LIST_TEAM_MEMBERS_SUCCESS':
            return{
                ...state,
                teams : action.res.teams,
            }
        
        case 'LOAD_CONTENTS_SUCCESS':
            return{
                ...state,
                contents : action.res.contents,
            }
        
        case 'LOAD_INVITATIONS_ACCESS_SUCCESS':
            return{
                ...state,
                receivedinvitations : action.res.recieved_invitations,
                sentinvitations     : action.res.sent_invitations,
            }

        case 'EDIT_TEAMS_SUCCESS':
            
            state.teams.filter(item => item.id !== action.res.team.id)
            state.teams.unshift(action.res.team);
            return {
                ...state,
                teams : state.teams,
            }
        case 'LOAD_PERMISSIONS_SUCCESS':
            return{
                ...state,
                permissions : action.res.roles,
            }
        
        case 'LOAD_ROLES_SUCCESS':
            return{
                ...state,
                roles : action.res.roles,
            }
        
        

        case 'LOAD_TEAMS_ERROR':
            return {
                ...state,
                settings: action.res,
            }
        

        case 'CODE_ERROR':
            return {
                ...state,
                settings: 'there seems to be a problem please refresh your browser',
            }

        default:
            return state

    }
}

export default SettingReducer;
