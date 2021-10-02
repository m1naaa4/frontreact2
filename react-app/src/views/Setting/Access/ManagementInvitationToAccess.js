import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import Invitations from './Invitations/Invitations';
import Receives from './Invitations/Receives';
import Ask from './Invitations/Ask';




export default function ManagementInvitationToAccess() { 


    return (
        <>  
        
        <div className="col-md-12 ">
            <div className="row">

            <div className="container">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Sent Invitations</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Received invitations</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Ask Access</Nav.Link>
                                </Nav.Item>
                                
                            </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                
                                <div className="col-lg-12">
                                <div className="User-Settings">
                                        <div className="form-inputs">
                                            <div className="offer-title">
                                                <h3><span  data-toggle="tooltip" data-placement="top" title="">
                                                Sent Invitations</span></h3><br></br>
                                                
                                            </div>
                                            <div className="form-group">
                                                <Invitations/>
                                            </div>
                                        </div>
                                </div>
                                </div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                
                                <div className="col-lg-12">
                                <div className="User-Settings">
                                        <div className="form-inputs">
                                            <div className="offer-title">
                                                <h3><span  data-toggle="tooltip" data-placement="top" title="">
                                                Received invitations</span></h3><br></br>
                                                
                                            </div>
                                            <div className="form-group">
                                                <Receives/>
                                            </div>
                                        </div>
                                </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                
                                <div className="col-lg-12">
                                <div className="User-Settings">
                                        <div className="form-inputs">
                                            <div className="offer-title">
                                                <h3><span  data-toggle="tooltip" data-placement="top" title="">
                                                Ask for Access to my content</span></h3><br></br>
                                                
                                            </div>
                                            <div className="form-group">
                                                <Ask/>
                                            </div>
                                        </div>
                                </div>
                                </div>
                            </Tab.Pane>
                            
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container> 
            </div>

                
            </div>
        </div>


              
            
        </>
    
           
        
    )
}