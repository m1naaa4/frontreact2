import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cancelInvitationAction, reSendAction } from '../../../../store/actions/Setting/SettingActions';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material';



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
        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>To</TableCell>
                    <TableCell align="right">Categorie</TableCell>
                    <TableCell align="right">Link</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">date</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                 {sentInvs && sentInvs?.map((row) => (
                    <TableRow
                    key={row.email}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.email}
                    </TableCell>
                    <TableCell align="right">{row.categorie}</TableCell>
                    <TableCell align="right"><Link to={row.route} >{row.pro_name}</Link></TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">{row.invite_date}</TableCell>
                    <TableCell align="right">Action</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        
            {/* <Table striped bordered hover>
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
            </Table> */}
        </>
    
           
        
    )
}