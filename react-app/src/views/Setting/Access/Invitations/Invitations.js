import React, { useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cancelInvitationAction, reSendAction } from '../../../../store/actions/Setting/SettingActions';




export default function Invitations() { 

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    
    const sentInvs = useSelector(state => state.setting.sentinvitations);
    const resend = (id) => {
        let data = {
            'url'   : 'permission/resendinvite',
            'id'    : id,
          } 
          dispatch(reSendAction(data));
    }

    const cancel = (token) => {
        let data = {
            'url'   : 'permission/cancel',
            'token' : token,
          } 
          dispatch(cancelInvitationAction(data));
    }
    
    
    const menu = () => {
       setOpen(!open)
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
                        <td>
                            <div class="New-Post" onClick={menu} >
                                <button class="Add-New" data-toggle="tooltip" data-placement="bottom" title="Add new"><i class="uil uil-ellipsis-v"></i></button>
                                {open && <div class="Dadupa-Popup-DropDown Dadupa-Popup-DropDown_Active">
                                <ul class="Mini-Profile-Items">
                                    <li class="Mini-Profile-Item"><a href="#" onClick={()=>resend(sent.id)} ><i class="uil uil-message"></i>  Resend</a></li>
                                    <li class="Mini-Profile-Item"><a href="#" onClick={()=>cancel(sent.deny_token)} ><i class="uil uil-cancel"></i> Cancel</a></li>
                                </ul>
                                </div>}
                            </div>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table>
        </>
    
           
        
    )
}