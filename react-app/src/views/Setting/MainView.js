import React, { useEffect } from 'react'

import SideRightSettingView from './SideLeftSettingView';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import TeamMain from './Team/TeamMain';
import ManagementPermission from './Access/ManagementPermission';
import { useDispatch } from 'react-redux';
import { PermissionsAction, TeamMembersAction, TeamsAction } from '../../store/actions/Setting/SettingActions';



export default function MainView() { 
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(TeamMembersAction('team/getMembers'));
        dispatch(PermissionsAction('permission/get'));

        
    },[])

    dispatch(TeamMembersAction('team/getMembers'));
    return (
        <>  
            <div classNameName="Page-Wrapper">
             <div classNameName="container">
                <div classNameName="offer-wizard-wrapper">
                    <div classNameName="row">
                        <div className="col-md-12">
                            <div className="row">
                            <div className="container">
                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                                                    <Nav.Link eventKey="third">Access Management</Nav.Link>
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
                                            <Tab.Pane eventKey="third">
                                                <ManagementPermission />
                                            </Tab.Pane>
                                        </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
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
