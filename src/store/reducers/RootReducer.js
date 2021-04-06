import {combineReducers} from 'redux'
import UserAuthReducer from '../reducers/User/Auth/AuthReducer'
import UserReducer  from '../reducers/User/UserReducer'
import ProfileReducer  from '../reducers/User/ProfileReducer'
import ProjectReducer  from '../reducers/User/Project/ProjectReducer'
import GetProjectReducer  from '../reducers/User/Project/GetProjectReducer'
import AddProjectReducer  from '../reducers/User/Project/AddProjectReducer'
import uploadFileReducer from "./User/Project/UploadFileReducer";



import AvatarReducer from './Post/AvatarReducer'
import AddPostReducer from './Post/AddPostReducer'
import GetPostsReducer from './Post/GetPostsReducer'

import GetNotificationsReducer from './Notification/GetNotificationsReducer'
import GetAddedNotificationReducer from './Notification/GetAddedNotificationReducer'

import AddCommentReducer from './Comment/AddCommentReducer'
import GetCommentReducer from './Comment/GetCommentReducer'

const RootReducer = combineReducers({
  userAuth:UserAuthReducer,
  userProfile: UserReducer,
  infoProfile: ProfileReducer,
  projects: ProjectReducer,  //from here   project = useSelector(state => state.project.project)   projectView
  getproject: GetProjectReducer,  //from here   project = useSelector(state => state.project.project)   projectView
  addproject: AddProjectReducer,
  fileuploaded: uploadFileReducer,

  updateavatar: AvatarReducer,
  posts: GetPostsReducer,
  post: AddPostReducer,

  addComment:AddCommentReducer,
  getComments:GetCommentReducer,

  getnotifications:GetNotificationsReducer,
  addednotification:GetAddedNotificationReducer
})

export default RootReducer

