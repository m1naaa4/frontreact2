import {combineReducers} from 'redux'
import UserAuthReducer from '../reducers/User/Auth/AuthReducer'
import UserReducer  from '../reducers/User/UserReducer'
import ProfileReducer  from '../reducers/User/ProfileReducer'
import ProjectReducer  from '../reducers/User/Project/ProjectReducer'
import GetProjectReducer  from '../reducers/User/Project/GetProjectReducer'
import AddProjectReducer  from '../reducers/User/Project/AddProjectReducer'
import uploadFileReducer from "./User/Project/UploadFileReducer";
import CreateFunderReducer from './Funder/CreateFunderReducer'
import FundersReducer from './Funder/FundersReducer'


import AvatarReducer from './Post/AvatarReducer'
import AddPostReducer from './Post/AddPostReducer'
import GetPostsReducer from './Post/GetPostsReducer'

import GetNotificationsReducer from './Notification/GetNotificationsReducer'
import GetAddedNotificationReducer from './Notification/GetAddedNotificationReducer'

import GetCommentReducer from './Comment/CommentReducer'

import ConversationsReducer from './Messenger/ConversationsReducer'
import ConversationReducer from './Messenger/ConversationReducer'
import OffreReducer from './Offre/OffreReducer'
import AddYoutubeReducer from './Post/AddYoutubeReducer'
import SettingReducer from './Team/SettingReducer'
import GeneraleReducer from './Generale/GeneraleReducer'
import AdminAuthReducer from './Admin/AuthReducer'
import ReportReducer from './Report/ReportReducer'
import GeneraleVariableReducer from './Generale/GeneralVariableReducer'

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
  youtube: AddYoutubeReducer,

  getComments:GetCommentReducer,

  generale:GeneraleReducer,
  generaleVariable:GeneraleVariableReducer,

  setting:SettingReducer,

  getnotifications:GetNotificationsReducer,
  addednotification:GetAddedNotificationReducer,
  offres:OffreReducer,

  conversations:ConversationsReducer,
  messages:ConversationReducer,

  createFunder:CreateFunderReducer,
  funders: FundersReducer, 

  adminAuth:AdminAuthReducer,
  reportsData:ReportReducer,
})

export default RootReducer

