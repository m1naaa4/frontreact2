import React, { useEffect, useState } from 'react'

import SideRightSettingView from './SideLeftSettingView';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import TeamMain from './Team/TeamMain';
import ManagementPermission from './Access/ManagementPermission';
import { useDispatch, useSelector } from 'react-redux';
import { ContentsAction, InvitationsAccessAction, PermissionsAction, TeamMembersAction, TeamsAction } from '../../store/actions/Setting/SettingActions';
import ContentMain from './Content/ContentMain';
import ManagementInvitationToAccess from './Access/ManagementInvitationToAccess';
import { useHistory, useParams } from 'react-router';



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

    console.log(history.location.pathname)
    useEffect(() => {
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

    const tabs = (key) =>{
        history.push('/user/'+user?.profile?.id+'/settings/'+key)
        setKey(key); 
    }

    return (
        <>  
            <div classNameName="Page-Wrapper">
             <div classNameName="container">
                <div classNameName="offer-wizard-wrapper">
                    <div classNameName="row">
                        <div className="col-md-12">
                            <div className="row">
                            <div className="container">
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

                                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">General</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Team</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="four">Security Contents</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="third">Access Management</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="five">Access Management Invitations</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={9}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <SideRightSettingView />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <TeamMain />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="four">
                                                <ContentMain />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <ManagementPermission />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="five">
                                                <ManagementInvitationToAccess />
                                            </Tab.Pane>
                                        </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
            </div>
        </>
    
           
        
    )
}
