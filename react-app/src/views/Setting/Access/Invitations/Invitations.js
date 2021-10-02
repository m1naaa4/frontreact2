import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';




export default function Invitations() { 
    
    const sentInvs = useSelector(state => state.setting.sentinvitations);
    const gotInvs = useSelector(state => state.setting.receivedinvitations);
    const handleSubmitValue = (e) => {

         
    }


    return (
        <>     
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To</th>
                        <th>categorie</th>
                        <th>Link</th>
                        <th>Role</th>
                        <th>date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {sentInvs && sentInvs?.map((sent, index) => (
                    <tr key={index} >
                        <td>{sent.email}</td>
                        <td>{sent.categorie}</td>
                        <td><Link to={sent.route} >{sent.pro_name}</Link></td>
                        <td>{sent.role}</td>
                        <td>{sent.invite_date}</td>
                        <td><button>cancel</button></td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    
           
        
    )
}