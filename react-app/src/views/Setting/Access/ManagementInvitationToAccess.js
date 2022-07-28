import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import Invitations from './Invitations/Invitations';
import Receives from './Invitations/Receives';
import Ask from './Invitations/Ask';




export default function ManagementInvitationToAccess(props) { 


    return (
        <>  
        <div class="accessTables-container">
            {props.section =='' && <Invitations/>}
            {props.section == '#invitations' && <Invitations/>}
            {props.section == '#received' && <Receives/>}
            {props.section == '#access' && <Ask/>}
        </div>
        </>        
    )
}