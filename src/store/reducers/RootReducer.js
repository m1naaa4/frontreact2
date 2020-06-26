import {combineReducers} from 'redux'
import UserAuthReducer from '../reducers/User/Auth/AuthReducer'
import UserProfileReducer  from '../reducers/User/ProfileReducer'
import ProjectReducer  from '../reducers/User/Project/ProjectReducer'
import AddProjectReducer  from '../reducers/User/Project/AddProjectReducer'

const RootReducer = combineReducers({
  userAuth:UserAuthReducer,
  userProfile: UserProfileReducer,
  projects: ProjectReducer,  //from here   project = useSelector(state => state.project.project)   projectView
  addproject: AddProjectReducer,
})

export default RootReducer

