import React, { useEffect, useState } from 'react'

import SideRightSettingView from './SideLeftSettingView';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ContentsAction, InvitationsAccessAction, PermissionsAction, TeamMembersAction } from '../../store/actions/Setting/SettingActions';
import ManagementInvitationToAccess from './Access/ManagementInvitationToAccess';
import { useHistory, useParams } from 'react-router';

import { NavLink } from 'react-router-dom';


export default function MainView() { 
    const dispatch = useDispatch();
    const params = useParams();
    const [key, setKey] = useState();
    const history = useHistory();
    const user = useSelector(state => state.userProfile.userProfile);
    
    useEffect(()=>{
        dispatch(TeamMembersAction('team/getMembers'));
        dispatch(PermissionsAction('permission/get'));
        dispatch(ContentsAction('user/getcontents'));
        dispatch(InvitationsAccessAction('team/invitations'));
    },[])

    useEffect(() => {
        if(history.location.pathname === '/user/'+user?.profile?.id+'/settings'){
            history.push('/user/'+user?.profile?.id+'/settings/generale')
        }
        if (history.location.pathname === '/user/'+user?.profile?.id+'/settings/generale') {
            setKey('generale');
        } else if(history.location.pathname === '/user/'+user?.profile?.id+'/settings/team') {
            setKey('team');
        }else if(history.location.pathname === '/user/'+user?.profile?.id+'/settings/securitycontent'){
            setKey('securitycontent');
        }
        else if(history.location.pathname === '/user/'+user?.profile?.id+'/settings/accessmanagement'){
            setKey('accessmanagement');
        }
        else if(history.location.pathname === '/user/'+user?.profile?.id+'/settings/accessmanagementinvitations'){
            setKey('accessmanagementinvitations');
        }
    })

    return (
        <>  
            <div className="Page-Wrapper">
             <div className="container">
                 <div className='mt-45'></div>
                <div className="offer-wizard-wrapper">
                    <div className="">
                    {key &&
                        <div className='row'>
                            <div className="col-md-3">
                                <div className="left-Side">
                                <div className="Contact-Widget menu-settings">
                                    <h3 className="Widget-Title"> <NavLink activeClassName="Active-Nav" to={`/user/`+user?.profile?.id+`/settings/generale`}>General</NavLink></h3>
                                        <h3 className="Widget-Title">
                                            <NavLink activeClassName="Active-Nav" to={`/user/`+user?.profile?.id+`/settings/accessmanagementinvitations`}>Invitations to content</NavLink>
                                            <Nav variant="pills" className="flex-column sub-menu-settings">
                                                <Nav.Item>
                                                    <Nav.Link className={history.location.hash == '#invitations' ? 'active' : ''} href='#invitations'>Sent Invitations</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className={history.location.hash == '#received' ? 'active' : ''} href='#received'>Received invitations</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className={history.location.hash == '#access' ? 'active' : ''} href='#access'>Ask Access</Nav.Link>
                                                </Nav.Item>
                                                
                                            </Nav>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                {key==='generale' &&  <SideRightSettingView />}
                                {key==='accessmanagementinvitations' &&  <ManagementInvitationToAccess section={history.location.hash} />}
                            </div>
                        </div>
                    }
                        {/* <div className="col-md-9">
                            {params.id === user?.profile?.id &&
                                    
                                    <Tabs id="controlled-tab-example"  activeKey={key} onSelect={(k) => tabs(k)} className="mb-3">
                                    
                                        <Tab eventKey="generale" title="General">
                                            <SideRightSettingView />
                                        </Tab>
                                        
                                         <Tab eventKey="team" title="Team">
                                            <TeamMain />
                                        </Tab>
                                        
                                        <Tab eventKey="securitycontent" title="Security Contents">
                                            <ContentMain />
                                        </Tab>
                                    
                                        <Tab eventKey="accessmanagement" title="Access Management">
                                            <ManagementPermission />
                                        </Tab>
                                        
                                        
                                        <Tab eventKey="accessmanagementinvitations" title="Invitations to content" >
                                            <ManagementInvitationToAccess />
                                        </Tab>
                                    
                                    </Tabs> 
                                }

                        </div> */}
                    </div>
                </div>
             </div>
            </div>
        </>
    )
}
