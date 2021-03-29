import {combineReducers} from 'redux'
import UserAuthReducer from '../reducers/User/Auth/AuthReducer'
import UserReducer  from '../reducers/User/UserReducer'
import ProfileReducer  from '../reducers/User/ProfileReducer'
import ProjectReducer  from '../reducers/User/Project/ProjectReducer'
import GetProjectReducer  from '../reducers/User/Project/GetProjectReducer'
import AddProjectReducer  from '../reducers/User/Project/AddProjectReducer'
import uploadFileReducer from "./User/Project/UploadFileReducer";
import addtagDescriptionprojectReducer from "./User/Project/AddTagDescrptionProjectReducer";
import AddCommentReducer from "./User/Comment/AddCommentReducer";
import GetCommentReducer from "./User/Comment/GetCommentReducer";

const RootReducer = combineReducers({
  userAuth:UserAuthReducer,
  userProfile: UserReducer,
  infoProfile: ProfileReducer,
  projects: ProjectReducer,  //from here   project = useSelector(state => state.project.project)   projectView
  getproject: GetProjectReducer,  //from here   project = useSelector(state => state.project.project)   projectView
  addproject: AddProjectReducer,
  fileuploaded: uploadFileReducer,
  addtagdescriptionproject: addtagDescriptionprojectReducer,

  addComment:AddCommentReducer,
  getComments:GetCommentReducer
})

export default RootReducer

