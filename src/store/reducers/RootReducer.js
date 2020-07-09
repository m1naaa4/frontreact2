import {combineReducers} from 'redux'
import UserAuthReducer from '../reducers/User/Auth/AuthReducer'
import UserProfileReducer  from '../reducers/User/ProfileReducer'
import ProjectReducer  from '../reducers/User/Project/ProjectReducer'
import AddProjectReducer  from '../reducers/User/Project/AddProjectReducer'
import uploadFileReducer from "./User/Project/UploadFileReducer";

const RootReducer = combineReducers({
  userAuth:UserAuthReducer,
  userProfile: UserProfileReducer,
  projects: ProjectReducer,  //from here   project = useSelector(state => state.project.project)   projectView
  addproject: AddProjectReducer,
  fileuploaded: uploadFileReducer,
})

export default RootReducer

